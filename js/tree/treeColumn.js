import TreeColumnCategory from "./treeColumnCategory.js";

// ====================================================== //
// ======================= TreeRow ====================== //
// ====================================================== //

export default class TreeColumn {
  constructor(bookmarkColumn) {
    this.bookmarkColumn = bookmarkColumn;
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
    this.bookmarkColumn.forEach((bookmarkCategory) => {
      ul.appendChild(new TreeColumnCategory(bookmarkCategory).html());
    });

    tree.appendChild(ul);
    return column;
  }
}
