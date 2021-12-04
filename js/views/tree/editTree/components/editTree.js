import ThemeChanger from "../../themechanger/theme-changer.js";
import EditSearchBar from "./editSearchBar.js";
import EditTreeColumn from "./editTreeColumn.js";
import Button from "../../../other/button.js";
import Tree from "../../components/tree.js";

// ====================================================== //
// ======================== Tree ======================== //
// ====================================================== //

export default class EditTree extends Tree {
  constructor(config) {
    super(config);
  }

  // ~~~~~~~~ override parent methods ~~~~~~~ //

  initBookmarkColumns(config) {
    return config.map(
      (column) => new EditTreeColumn(column, this.onColumnUpdate.bind(this))
    );
  }

  initSearchBar(config) {
    return new EditSearchBar(config);
  }

  initThemeChanger(config) {
    return new ThemeChanger(config);
  }

  renderHtml() {
    this.root = super.renderHtml();
    this.root.append(this.themeChanger.html());
    this.titlePrompt.appendChild(this.#addColumnButtonHtml());
    return this.root;
  }

  // ~~~~~~~~~~ edit tree methods ~~~~~~~~~~ //

  #addColumnButtonHtml = () => {
    const addColumnButton = new Button("add").html();
    addColumnButton.addEventListener("click", () => {
      const newBookmarkColumn = new EditTreeColumn(
        [{ cn: "new category", b: [] }],
        this.onColumnUpdate
      );
      const newBookmarkColumnHtml = newBookmarkColumn.html();
      this.bookmarkRow.appendChild(newBookmarkColumnHtml);
      this.bookmarkColumns.push(newBookmarkColumn);
    });
    return addColumnButton;
  };

  // ~~~~~~~~~~~ callback methods ~~~~~~~~~~ //

  onColumnUpdate(treeUpdateEvent) {
    if (treeUpdateEvent.type === "delete") {
      const index = this.bookmarkColumns.indexOf(treeUpdateEvent.updatedObject);
      this.bookmarkColumns.splice(index, 1);
    }
  }
}
