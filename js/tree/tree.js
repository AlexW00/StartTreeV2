import ThemeChanger from "./themechanger/theme-changer.js";
import SearchBar from "./searchBar.js";
import TreeColumn from "./treeColumn.js";
import Button from "./edit/button.js";
import Editor from "./edit/editor.js";

// ====================================================== //
// ======================== Tree ======================== //
// ====================================================== //

export default class Tree {
  constructor(config, isEditing) {
    this.bookmarkColumns = config.bmc.map(
      (column) => new TreeColumn(column, isEditing)
    );
    this.searchEngine = config.s;
    this.version = config.v || "0.0";
    this.isEditing = isEditing;
  }

  // returns a div of class "container", containing the entire bookmark tree
  html = () => {
    const container = document.createElement("div");
    container.classList.add("container");
    const prompt = document.createElement("div");
    prompt.classList.add("prompt");
    prompt.innerHTML = "~ ";
    const symSpan = document.createElement("span");
    symSpan.innerHTML = "λ ";
    prompt.appendChild(symSpan);
    prompt.innerHTML += " tree";
    container.appendChild(prompt);

    const row = document.createElement("div");
    row.classList.add("row");

    if (this.isEditing) {
      const addColumnButton = new Button("add").html();
      addColumnButton.addEventListener("click", () => {
        const newBookmarkColumn = new TreeColumn(
          [{ cn: "new category", b: [] }],
          this.isEditing
        );
        const newBookmarkColumnHtml = newBookmarkColumn.html(addColumnButton);
        row.appendChild(newBookmarkColumnHtml);
        this.bookmarkColumns.push(newBookmarkColumn);
      });
      prompt.appendChild(addColumnButton);
    }

    this.bookmarkColumns.forEach((bookmarkColumn) => {
      row.appendChild(bookmarkColumn.html());
    });
    container.appendChild(row);

    const searchBar = new SearchBar(this.searchEngine);
    container.appendChild(searchBar.html());

    if (this.isEditing) {
      const themeChanger = new ThemeChanger();
      container.appendChild(themeChanger.html());
    }

    return container;
  };

  export() {
    return {
      s: this.searchEngine,
      v: this.version,
      bmc: this.bookmarkColumns.map((column) => column.export()),
    };
  }
}
