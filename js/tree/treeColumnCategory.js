import TreeItem from "./treeItem.js";
export default class TreeColumnCategory {
  constructor(bookmarkCategory) {
    this.bookmarkCategory = bookmarkCategory;
  }

  html() {
    const column = document.createElement("li");

    const h1 = document.createElement("h1");
    h1.innerHTML = this.bookmarkCategory.cn;
    column.appendChild(h1);

    const ul = document.createElement("ul");
    this.bookmarkCategory.b.forEach((bookmark) => {
      ul.appendChild(new TreeItem(bookmark).html());
    });

    column.appendChild(ul);
    return column;
  }
}
