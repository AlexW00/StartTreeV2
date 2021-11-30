import TreeColumnCategory from "./treeColumnCategory.js";
import Button from "./edit/button.js";
import Editor from "./edit/editor.js";
import editorTarget from "./edit/editorTarget.js";
import EditorOptions from "./edit/editorOptions.js";
import TreeUpdateEvent from "./edit/treeUpdateEvent.js";

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

  // Returns a
  html() {
    const column = document.createElement("div");
    this.root = column;

    column.classList.add("column");
    column.setAttribute("id", this.id);

    const tree = document.createElement("div");
    tree.classList.add("tree");
    column.appendChild(tree);
    const h1 = document.createElement("h1");
    h1.innerHTML = ".";
    h1.setAttribute("id", `${this.id}-h1`);
    h1.addEventListener("click", () => {
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
    });
    tree.appendChild(h1);

    const ul = document.createElement("ul");
    this.bookmarkCategories.forEach((bookmarkCategory) => {
      ul.appendChild(bookmarkCategory.html());
    });

    if (this.isEditing) ul.lastElementChild.appendChild(this.#addButton(ul));

    tree.appendChild(ul);

    return column;
  }

  #addButton(ul) {
    const addCategoryButton = new Button("add").html();
    addCategoryButton.style.position = "absolute";
    addCategoryButton.style.top = "1.5rem";
    addCategoryButton.style.left = "-1rem";
    addCategoryButton.addEventListener("click", () => {
      const elements = ul.querySelectorAll("li.category");
      elements[elements.length - 1].removeChild(addCategoryButton);
      const newBookmarkCategory = new TreeColumnCategory(
        { cn: "new category", b: [] },
        this.isEditing,
        this.#onCategoryUpdate
      );
      const newBookmarkCategoryHtml =
        newBookmarkCategory.html(addCategoryButton);
      ul.appendChild(newBookmarkCategoryHtml);

      if (this.isEditing) {
        new Editor(
          ul,
          new editorTarget(
            newBookmarkCategory.name,
            null,
            newBookmarkCategory.id
          ),
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
      }
    });
    return addCategoryButton;
  }

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
        lastCategory.appendChild(this.#addButton(this.root));
      }
    }
  };

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
