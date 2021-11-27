import TreeColumnCategory from "./treeColumnCategory.js";
import Button from "./edit/button.js";

// ====================================================== //
// ======================= TreeRow ====================== //
// ====================================================== //

export default class TreeColumn {
  constructor(bookmarkColumn, isEditing) {
    this.bookmarkCategories = bookmarkColumn.map((bookmarkCategory) => {
      return new TreeColumnCategory(bookmarkCategory, isEditing);
    });
    this.isEditing = isEditing;
  }

  // Returns a
  html() {
    const column = document.createElement("div");
    column.classList.add("column");

    const tree = document.createElement("div");
    tree.classList.add("tree");
    column.appendChild(tree);
    const h1 = document.createElement("h1");
    h1.innerHTML = ".";
    tree.appendChild(h1);

    const ul = document.createElement("ul");
    this.bookmarkCategories.forEach((bookmarkCategory, index) => {
      let bmc;
      if (index != this.bookmarkCategories.length - 1) {
        bmc = bookmarkCategory.html();
      } else {
        const addCategoryButton = new Button("add").html();
        addCategoryButton.style.position = "absolute";
        addCategoryButton.style.top = "1.5rem";
        addCategoryButton.style.left = "-1rem";
        bmc = bookmarkCategory.html(addCategoryButton);
      }

      ul.appendChild(bmc);
    });

    tree.appendChild(ul);

    return column;
  }

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
