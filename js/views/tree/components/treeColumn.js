import TreeColumnCategory from "./treeColumnCategory.js";
import Button from "../../other/button.js";
import Editor from "../editor/components/editor.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import TreeUpdateEvent from "../events/treeUpdateEvent.js";

// ====================================================== //
// ======================= TreeRow ====================== //
// ====================================================== //

export default class TreeColumn {
  static count = 0;
  constructor(bookmarkColumn, isEditing, onUpdate) {
    TreeColumn.count++;
    this.id = `column-${TreeColumn.count}`;
    this.onUpdate = onUpdate;
    this.bookmarkCategories = bookmarkColumn.map((bookmarkCategory) => {
      return new TreeColumnCategory(
        bookmarkCategory,
        isEditing,
        this.#onCategoryUpdate
      );
    });
    this.isEditing = isEditing;
  }

  // Returns a div of class "column", containing a tree of bookmark categories
  html() {
    // create a div of class "column", containing a tree of bookmark categories
    const column = document.createElement("div");
    this.root = column;
    column.classList.add("column");
    column.setAttribute("id", this.id);

    // create div of class "tree", containing an unordered list of bookmark categories
    const tree = document.createElement("div");
    tree.classList.add("tree");
    column.appendChild(tree);

    // create column title h1
    tree.appendChild(this.#newColumnTitle(tree));

    // create ul of class "categories", containing all bookmark categories
    const ul = document.createElement("ul");
    this.bookmarkCategories.forEach((bookmarkCategory) => {
      ul.appendChild(bookmarkCategory.html());
    });
    tree.appendChild(ul);

    // add add button to the last category if edit mode is on
    if (this.isEditing)
      ul.lastElementChild.appendChild(this.#newAddCategoryButton(ul));

    return column;
  }

  // creates a column title h1 with listener and returns its html
  #newColumnTitle(tree) {
    const h1 = document.createElement("h1");
    h1.innerHTML = ".";
    h1.setAttribute("id", `${this.id}-h1`);
    h1.addEventListener("click", () => {
      this.#categoryTitleListener(h1, tree);
    });
    return h1;
  }

  // listener for column title h1
  #categoryTitleListener = (h1, tree) => {
    if (this.isEditing) {
      new Editor(
        tree,
        new editorTarget(".", null, h1.id),
        new EditorOptions({
          allowTextEdit: false,
          buttons: ["cancel", "delete"],
          nodeType: "h1",
        }),
        (editorFinishEvent) => {
          if (editorFinishEvent.type === "delete") {
            this.onUpdate(
              new TreeUpdateEvent({ type: "delete", updatedObject: this })
            );
            this.root.parentElement.removeChild(this.root);
          } else {
            tree.insertBefore(
              h1,
              tree.querySelectorAll("ul")[editorFinishEvent.index]
            );
          }
        }
      );
    }
  };

  // creates a new add button for a category
  #newAddCategoryButton(ul) {
    const addCategoryButton = new Button("add").html();
    addCategoryButton.style.position = "absolute";
    addCategoryButton.style.top = "1.5rem";
    addCategoryButton.style.left = "-1rem";
    addCategoryButton.addEventListener("click", () => {
      this.#onAddCategoryButtonClick(ul, addCategoryButton);
    });
    return addCategoryButton;
  }

  // listener for when the add button is clicked
  #onAddCategoryButtonClick = (ul, addCategoryButton) => {
    // removes add button from last category
    const elements = ul.querySelectorAll("li.category");
    elements[elements.length - 1].removeChild(addCategoryButton);
    // creates new category and appends it to the end of the node
    const newBookmarkCategory = new TreeColumnCategory(
      { cn: "new category", b: [] },
      this.isEditing,
      this.#onCategoryUpdate
    );
    const newBookmarkCategoryHtml = newBookmarkCategory.html(addCategoryButton);
    ul.appendChild(newBookmarkCategoryHtml);

    // opens editor on the newly created category
    new Editor(
      ul,
      new editorTarget(newBookmarkCategory.name, null, newBookmarkCategory.id),
      new EditorOptions({ buttons: ["cancel"] }),
      (editorFinishEvent) => {
        if (editorFinishEvent.type === "save") {
          // append new bookmark category to end of list and push to array
          newBookmarkCategory.name = editorFinishEvent.editResult.text;
          const newBookmarkCategoryHtml = newBookmarkCategory.html();
          this.bookmarkCategories.push(newBookmarkCategory);

          ul.appendChild(newBookmarkCategoryHtml);
          newBookmarkCategoryHtml.appendChild(addCategoryButton);
        } else {
          // re append the button
          ul.lastElementChild.appendChild(addCategoryButton);
        }
      }
    );
  };

  // listener for when a bookmark category is updated
  #onCategoryUpdate = (treeUpdateEvent) => {
    if (treeUpdateEvent.type === "delete") {
      // get the index of the category to delete
      const categoryIndex = this.bookmarkCategories.indexOf(
        treeUpdateEvent.updatedObject
      );
      // remove the category from the array
      this.bookmarkCategories.splice(categoryIndex, 1);

      // if no category is left, remove this column
      if (this.bookmarkCategories.length === 0) {
        this.root.parentElement.removeChild(this.root);
        this.onUpdate(
          new TreeUpdateEvent({ type: "delete", updatedObject: this })
        );
      }
      // else if this was the last category in the list, append the add button to the new last category
      else if (categoryIndex === this.bookmarkCategories.length) {
        const lastCategory = this.root.querySelector("ul").lastChild;
        lastCategory.appendChild(this.#newAddCategoryButton(this.root));
      }
    }
  };

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
