// ====================================================== //
// ====================== SearchBar ===================== //
// ====================================================== //;

export default class SearchBar {
  constructor(config) {
    this.searchEngineUrl = config.u ?? "https://duckduckgo.com/?q=";
    this.searchEngineNameShort = config.n ?? "ddg";
  }

  // ~~~~~~~~~~~~~ html methods ~~~~~~~~~~~~ //

  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    this.root = this.rootHtml();

    this.sectionName = this.sectionNameHtml();
    this.root.appendChild(this.sectionName);

    this.form = this.formHtml();
    this.root.appendChild(this.form);

    // edit mode false specific
    this.h1 = this.formTitleHtml();
    this.form.appendChild(this.h1);
    this.formInput = this.formInputHtml();
    this.form.appendChild(this.formInput);

    return this.root;
  }

  rootHtml() {
    const root = document.createElement("div");
    root.classList.add("search-bar");
    root.classList.add("prompt");
    return root;
  }

  sectionNameHtml() {
    const sectionName = document.createElement("div");
    sectionName.setAttribute("id", "searchBarText");
    const textContent = document.createElement("div");
    textContent.classList.add("text-content");
    textContent.style.display = "inline";
    textContent.innerHTML = "~";
    const symSpan = document.createElement("span");
    symSpan.innerHTML = " γ ";
    textContent.appendChild(symSpan);
    textContent.innerHTML += `${this.searchEngineNameShort}`;

    sectionName.appendChild(textContent);
    return sectionName;
  }

  formHtml() {
    const form = document.createElement("form");
    form.setAttribute("action", this.searchEngineUrl);
    form.setAttribute("method", "get");
    form.setAttribute("autocomplete", "off");
    return form;
  }

  formTitleHtml() {
    const h1 = document.createElement("h1");
    h1.innerHTML = "search:";
    return h1;
  }

  formInputHtml() {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("name", "q");
    searchInput.setAttribute("autofocus", "autofocus");
    return searchInput;
  }

  // ~~~~~~~~~~~~~~~~ export ~~~~~~~~~~~~~~~ //

  export() {
    return {
      n: this.searchEngineNameShort,
      u: this.searchEngineUrl,
    };
  }
}
