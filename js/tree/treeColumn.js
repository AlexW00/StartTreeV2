import TreeColumnCategory from "./treeColumnCategory.js";

// ====================================================== //
// ======================= TreeRow ====================== //
// ====================================================== //

export default class TreeColumn {
  constructor(bookmarkColumn) {
    this.bookmarkCategories = bookmarkColumn.map((bookmarkCategory) => {
      return new TreeColumnCategory(bookmarkCategory);
    });
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
    this.bookmarkCategories.forEach((bookmarkCategory) => {
      ul.appendChild(bookmarkCategory.html());
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
