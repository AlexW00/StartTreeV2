import TreeColumnCategory from "./treeColumnCategory.js";

// ====================================================== //
// ======================= TreeColumn =================== //
// ====================================================== //

export default class TreeColumn {
  static count = 0;
  constructor(bookmarkColumn) {
    TreeColumn.count++;
    this.id = `column-${TreeColumn.count}`;
    this.bookmarkCategories = this.initBookmarkCategories(bookmarkColumn);
  }

  // ~~~~~~~~~~~~ html elements ~~~~~~~~~~~~ //

  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    // create a div of class "column", containing a tree of bookmark categories
    this.root = this.rootHtml();

    // create div of class "tree", containing an unordered list of bookmark categories
    this.tree = this.treeHtml();
    this.root.appendChild(this.tree);

    this.columnTitle = this.columnTitleHtml();
    this.tree.appendChild(this.columnTitle);

    // create ul of class "categories", containing all bookmark categories
    this.categoryList = this.categoryListHtml();
    this.tree.appendChild(this.categoryList);

    return this.root;
  }

  treeHtml() {
    const tree = document.createElement("div");
    tree.classList.add("tree");
    return tree;
  }

  categoryListHtml() {
    const ul = document.createElement("ul");
    this.bookmarkCategories.forEach((bookmarkCategory) => {
      ul.appendChild(bookmarkCategory.html());
    });
    return ul;
  }

  rootHtml() {
    const column = document.createElement("div");
    column.classList.add("column");
    column.setAttribute("id", this.id);
    return column;
  }

  // creates a column title h1 with listener and returns its html
  columnTitleHtml() {
    const h1 = document.createElement("h1");
    h1.innerHTML = ".";
    h1.setAttribute("id", `${this.id}-h1`);
    return h1;
  }

  // ~~~~~~~~~~~~ class functionality ~~~~~~~~~~~~ //

  initBookmarkCategories(categoryConfig) {
    return categoryConfig.map((bookmarkCategory) => {
      return new TreeColumnCategory(bookmarkCategory);
    });
  }

  export() {
    return this.bookmarkCategories.map((bookmarkCategory) => {
      return bookmarkCategory.export();
    });
  }
}
