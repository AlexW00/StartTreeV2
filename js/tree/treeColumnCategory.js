import TreeItem from "./treeItem.js";

// ====================================================== //
// ================= TreeColumnCategory ================= //
// ====================================================== //

export default class TreeColumnCategory {
  constructor(bookmarkCategory) {
    this.name = bookmarkCategory.cn;
    this.bookmarks = bookmarkCategory.b.map((bookmark) => {
      return new TreeItem(bookmark);
    });
  }

  // returns a bookmark category with all bookmarks of that category
  html() {
    const column = document.createElement("li");

    const h1 = document.createElement("h1");
    h1.innerHTML = this.name;
    column.appendChild(h1);

    const ul = document.createElement("ul");
    this.bookmarks.forEach((bookmark) => {
      ul.appendChild(bookmark.html());
    });

    column.appendChild(ul);
    return column;
  }

  export() {
    return {
      cn: this.name,
      b: this.bookmarks.map((bookmark) => {
        return bookmark.export();
      }),
    };
  }
}
