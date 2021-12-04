// ====================================================== //
// ====================== SearchBar ===================== //
// ====================================================== //;

import SearchBar from "../../components/searchBar.js";
import Editor from "../editor/components/editor.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import Button from "../../../other/button.js";

export default class EditSearchBar extends SearchBar {
  constructor(config) {
    super(config);
  }

  // ~~~~~~~ override parent methods ~~~~~~~ //

  renderHtml() {
    this.root = this.rootHtml();

    this.sectionName = this.#sectionNameHtml();
    this.root.appendChild(this.sectionName);

    this.form = this.formHtml();
    this.root.appendChild(this.form);

    return this.root;
  }

  // ~~~~~~~ EditSearchBar methods ~~~~~~~ //

  editButtonHtml() {
    const editButton = new Button("edit"),
      editButtonHtml = editButton.html();
    editButtonHtml.classList.add("search-bar-edit-button");
    return editButtonHtml;
  }

  #sectionNameHtml = () => {
    const sectionName = super.sectionNameHtml();
    sectionName.classList.add("search-bar-title");
    sectionName.appendChild(this.editButtonHtml());

    sectionName.addEventListener("click", () => {
      new Editor(
        this.root,
        new editorTarget(
          this.searchEngineNameShort,
          this.searchEngineUrl,
          "searchBarText"
        ),
        new EditorOptions({
          openWithLinkInput: true,
          nodeType: "div",
          buttons: ["cancel", "save", "link"],
        }),
        (editorFinishEvent) => {
          if (editorFinishEvent.type === "save") {
            this.searchEngineUrl = editorFinishEvent.editResult.link;
            this.searchEngineNameShort = editorFinishEvent.editResult.text;
            this.root.prepend(this.#sectionNameHtml());
          } else {
            this.root.prepend(this.#sectionNameHtml());
          }
        }
      );
    });
    return sectionName;
  };
}
