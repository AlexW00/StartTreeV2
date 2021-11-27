// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //

export default class TreeItem {
  constructor(bookmark) {
    this.name = bookmark.n;
    this.url = bookmark.u;
  }

  // returns a bookmark category item
  html() {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${this.url}">${this.name}</a>`;
    return li;
  }

  export() {
    return {
      n: this.name,
      u: this.url,
    };
  }
}
