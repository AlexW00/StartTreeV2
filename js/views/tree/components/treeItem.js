// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
//

export default class TreeItem {
  static count = 0;
  constructor(bookmark) {
    TreeItem.count++;
    this.id = `bookmark-${TreeItem.count}`;
    this.name = bookmark.n;
    this.url = bookmark.u;
  }

  // returns a bookmark category html item
  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    this.root = this.rootHtml();
    this.a = this.linkHtml();
    this.root.appendChild(this.a);
    return this.root;
  }

  linkHtml() {
    const a = document.createElement("a");
    a.classList.add("bookmark-link");
    a.href = this.generateLinkText(this.url);
    a.textContent = this.name;
    return a;
  }

  rootHtml() {
    const root = document.createElement("li");
    root.classList.add("bookmark");
    root.setAttribute("id", this.id);
    return root;
  }

  generateLinkText(url) {
    // if the url has a protocol, return the url, else append a protocol
    if (url.includes("//")) {
      return url;
    } else return "//" + url;
  }

  export() {
    return {
      n: this.name,
      u: this.url,
    };
  }
}
