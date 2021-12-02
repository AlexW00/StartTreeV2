// ====================================================== //
// ====================== SearchBar ===================== //
// ====================================================== //;

import Editor from "../editor/components/editor.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";

export default class SearchBar {
  // either 1 for Google or 2 for DuckDuckGo
  constructor(config, isEditing) {
    this.isEditing = isEditing;
    this.searchEngineUrl = config.u ?? "https://duckduckgo.com/?q=";
    this.searchEngineNameShort = config.n ?? "ddg";
  }

  // returns the search bar html
  html = () => {
    const root = document.createElement("div");
    this.root = root;
    root.classList.add("search-bar");
    root.classList.add("prompt");

    const sectionName = this.#generateSectionName();
    root.appendChild(sectionName);

    const form = document.createElement("form");
    form.setAttribute("action", this.searchEngineUrl);
    form.setAttribute("method", "get");
    form.setAttribute("autocomplete", "off");
    root.appendChild(form);

    if (!this.isEditing) {
      const h1 = document.createElement("h1");
      h1.innerHTML = "search:";
      form.appendChild(h1);

      form.appendChild(this.generateSearchBar());
    }

    return root;
  };
  #generateSectionName = () => {
    const sectionName = document.createElement("div");
    sectionName.setAttribute("id", "searchBarText");
    sectionName.innerHTML = "~";
    const symSpan = document.createElement("span");
    symSpan.innerHTML = " γ ";
    sectionName.appendChild(symSpan);
    sectionName.innerHTML += `${this.searchEngineNameShort}`;

    if (this.isEditing) {
      sectionName.addEventListener("click", () => {
        console.log("clicked");
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
              this.root.prepend(this.#generateSectionName());
            } else {
              this.root.prepend(this.#generateSectionName());
            }
          }
        );
      });
    }

    return sectionName;
  };

  generateSearchBar = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "q");
    input.setAttribute("autofocus", "autofocus");
    return input;
  };

  export() {
    return {
      n: this.searchEngineNameShort,
      u: this.searchEngineUrl,
    };
  }
}
