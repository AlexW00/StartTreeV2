// ====================================================== //
// ====================== SearchBar ===================== //
// ====================================================== //;

export default class SearchBar {
  // either 1 for Google or 2 for DuckDuckGo
  constructor(engine) {
    if (engine === 1) {
      this.searchEngineUrl = "https://www.google.com/search?q=";
      this.searchEngineNameShort = "ggl";
    } else {
      this.searchEngineUrl = "https://duckduckgo.com/?q=";
      this.searchEngineNameShort = "ddg";
    }
  }

  // returns the search bar html
  html = () => {
    const root = document.createElement("div");
    root.classList.add("prompt");

    const sectionName = document.createElement("div");
    sectionName.innerHTML = "~";
    const symSpan = document.createElement("span");
    symSpan.innerHTML = " γ ";
    sectionName.appendChild(symSpan);
    sectionName.innerHTML += `${this.searchEngineNameShort}`;
    root.appendChild(sectionName);

    const form = document.createElement("form");
    form.setAttribute("action", this.searchEngineUrl);
    form.setAttribute("method", "get");
    form.setAttribute("autocomplete", "off");
    root.appendChild(form);

    const h1 = document.createElement("h1");
    h1.innerHTML = "search:";
    form.appendChild(h1);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "q");
    input.setAttribute("autofocus", "autofocus");
    form.appendChild(input);

    return root;
  };
}
