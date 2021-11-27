import TreeColumnCategory from "./treeColumnCategory.js";
import Button from "./edit/button.js";
import Editor from "./edit/editor.js";

// ====================================================== //
// ======================= TreeRow ====================== //
// ====================================================== //

export default class TreeColumn {
  static count = 0;
  constructor(bookmarkColumn, isEditing) {
    TreeColumn.count++;
    this.id = `column-${TreeColumn.count}`;
    this.bookmarkCategories = bookmarkColumn.map((bookmarkCategory) => {
      return new TreeColumnCategory(bookmarkCategory, isEditing);
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
        this.isEditing
      );
      const newBookmarkCategoryHtml =
        newBookmarkCategory.html(addCategoryButton);
      ul.appendChild(newBookmarkCategoryHtml);

      const editor = new Editor(
        ul,
        newBookmarkCategory,
        ["cancel"],
        false,
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

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
