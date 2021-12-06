// ====================================================== //
// ================= TreeColumnCategory ================= //
// ====================================================== //

import TreeItem from "./treeItem.js";

export default class TreeColumnCategory {
  static count = 0;
  constructor(bookmarkCategory) {
    TreeColumnCategory.count++;
    this.id = `category-${TreeColumnCategory.count}`;
    this.name = bookmarkCategory.cn;
    this.treeItems = this.initTreeItems(bookmarkCategory.b);
  }

  // ~~~~~~~~~~~~ html elements ~~~~~~~~~~~~ //

  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    this.root = this.rootHtml();

    this.categoryTitle = this.categoryTitleHtml();
    this.root.appendChild(this.categoryTitle);

    this.bookmarkList = this.bookmarkListHtml();
    this.root.appendChild(this.bookmarkList);

    return this.root;
  }

  rootHtml() {
    const root = document.createElement("li");
    root.setAttribute("id", this.id);
    root.classList.add("category");
    return root;
  }

  categoryTitleHtml() {
    const h1 = document.createElement("h1");
    h1.setAttribute("id", this.id + "-header");
    const span = document.createElement("span");
    span.classList.add("category-title");
    span.innerText = this.name;
    h1.appendChild(span);
    return h1;
  }

  bookmarkListHtml() {
    const ul = document.createElement("ul");
    this.treeItems.forEach((bookmark) => {
      ul.appendChild(bookmark.html());
    });
    return ul;
  }

  // ~~~~~~~~~~~~ class functionality ~~~~~~~~~~~~ //

  initTreeItems(bookmarkConfig) {
    return bookmarkConfig.map((bookmark) => {
      return new TreeItem(bookmark);
    });
  }

  export() {
    return {
      cn: this.name,
      b: this.treeItems.map((bookmark) => {
        return bookmark.export();
      }),
    };
  }
}
