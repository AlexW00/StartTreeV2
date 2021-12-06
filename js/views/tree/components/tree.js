import ThemeChanger from "../themechanger/theme-changer.js";
import SearchBar from "./searchBar.js";
import TreeColumn from "./treeColumn.js";

// ====================================================== //
// ======================== Tree ======================== //
// ====================================================== //

export default class Tree {
  constructor(config) {
    this.version = config.v || "0.0";

    this.bookmarkColumns = this.initBookmarkColumns(config.bmc);
    this.themeChanger = this.initThemeChanger(config.t);
    this.searchBar = this.initSearchBar(config.s);
  }

  // ~~~~~~~~ initialization methods ~~~~~~~ //

  initBookmarkColumns(config) {
    return config.map((column) => new TreeColumn(column));
  }

  initSearchBar(config) {
    return new SearchBar(config);
  }

  initThemeChanger(config) {
    return new ThemeChanger(config);
  }

  // ~~~~~~~~~~~~~html methods ~~~~~~~~~~~~ //

  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    this.root = this.rootHtml();

    this.titlePrompt = this.titlePromptHtml();
    this.root.appendChild(this.titlePrompt);

    this.bookmarkRow = this.bookmarkRowHtml();
    this.root.appendChild(this.bookmarkRow);

    this.root.appendChild(this.searchBar.html());

    return this.root;
  }

  rootHtml() {
    const container = document.createElement("div");
    container.classList.add("container");
    return container;
  }

  titlePromptHtml() {
    const prompt = document.createElement("div");
    prompt.classList.add("prompt");
    prompt.innerHTML = "~ ";
    const symSpan = document.createElement("span");
    symSpan.innerHTML = "λ ";
    prompt.appendChild(symSpan);
    prompt.innerHTML += " tree";
    return prompt;
  }

  bookmarkRowHtml() {
    const row = document.createElement("div");
    row.classList.add("row");
    this.bookmarkColumns.forEach((bookmarkColumn) => {
      row.appendChild(bookmarkColumn.html());
    });
    return row;
  }

  // ~~~~~~~~~~~~~ export ~~~~~~~~~~~ //

  export() {
    return {
      s: this.searchBar.export(),
      v: this.version,
      bmc: this.bookmarkColumns.map((column) => column.export()),
      t: this.themeChanger.export(),
    };
  }
}
