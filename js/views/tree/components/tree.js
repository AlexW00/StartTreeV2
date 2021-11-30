import ThemeChanger from "../themechanger/theme-changer.js";
import SearchBar from "./searchBar.js";
import TreeColumn from "./treeColumn.js";
import Button from "../../other/button.js";

// ====================================================== //
// ======================== Tree ======================== //
// ====================================================== //

export default class Tree {
  constructor(config, isEditing) {
    this.bookmarkColumns = config.bmc.map(
      (column) => new TreeColumn(column, isEditing, this.#onColumnUpdate)
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

    // add the add column button if edit mode is on
    if (this.isEditing) prompt.appendChild(this.#newAddColumnButton(row));

    // add the bookmark columns
    this.bookmarkColumns.forEach((bookmarkColumn) => {
      row.appendChild(bookmarkColumn.html());
    });
    container.appendChild(row);

    // add the search bar
    const searchBar = new SearchBar(this.searchEngine);
    container.appendChild(searchBar.html());

    // add the theme changer if edit mode is on
    if (this.isEditing) {
      const themeChanger = new ThemeChanger();
      container.appendChild(themeChanger.html());
    }

    return container;
  };

  // creates a new add column button and returns the html element
  #newAddColumnButton = (row) => {
    const addColumnButton = new Button("add").html();
    addColumnButton.addEventListener("click", () => {
      const newBookmarkColumn = new TreeColumn(
        [{ cn: "new category", b: [] }],
        this.isEditing,
        this.#onColumnUpdate
      );
      const newBookmarkColumnHtml = newBookmarkColumn.html();
      row.appendChild(newBookmarkColumnHtml);
      this.bookmarkColumns.push(newBookmarkColumn);
    });
    return addColumnButton;
  };

  // callback for when a bookmark column is updated
  #onColumnUpdate = (treeUpdateEvent) => {
    if (treeUpdateEvent.type === "delete") {
      // remove the column from the tree by its id
      const index = this.bookmarkColumns.indexOf(treeUpdateEvent.updatedObject);
      this.bookmarkColumns.splice(index, 1);
    }
  };

  export() {
    return {
      s: this.searchEngine,
      v: this.version,
      bmc: this.bookmarkColumns.map((column) => column.export()),
    };
  }
}
