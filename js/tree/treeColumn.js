import TreeColumnCategory from "./treeColumnCategory.js";
import Button from "./edit/button.js";
import Editor from "./edit/editor.js";

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
    column.classList.add("column");
    column.setAttribute("id", this.id);

    const tree = document.createElement("div");
    tree.classList.add("tree");
    column.appendChild(tree);
    const h1 = document.createElement("h1");
    h1.innerHTML = ".";
    h1.setAttribute("id", `${this.id}-h1`);
    h1.addEventListener("click", (event) => {
      // holy fuck this is so ugly
      const root = event.target.parentElement.parentElement.parentElement;
      if (this.isEditing) {
        const editor = new Editor(
          tree,
          { name: ".", id: h1.attributes.id.value },
          ["cancel", "delete"],
          { allowTextEdit: false, nodeType: "h1" },
          (event) => {
            if (event.type === "delete") {
              this.onUpdate({ type: "delete", id: this.id });
              column.parentElement.removeChild(column);
            } else {
              tree.insertBefore(h1, tree.querySelectorAll("ul")[event.index]);
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

    ul.lastElementChild.appendChild(this.#addButton(ul));

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

      const editor = new Editor(
        ul,
        newBookmarkCategory,
        ["cancel"],
        {},
        (event) => {
          if (event.type === "save") {
            // append new bookmark category to end of list and push to array
            newBookmarkCategory.name = event.editResult.text;
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
    });
    return addCategoryButton;
  }

  #onCategoryUpdate = (event) => {
    if (event.type === "delete") {
      console.log(this);
      this.bookmarkCategories.splice(event.index, 1);
      console.log(this.bookmarkCategories);
    } else if (event.type === "save" || event.type === "close") {
      // if it is the last element
      console.log(event.index);
      if (event.index === this.bookmarkCategories.length - 1) {
        // re append the add category button
        event.html.appendChild(this.#addButton(event.html.parentElement));
      }
    }
  };

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
