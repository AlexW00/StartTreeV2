export default class TreeItem {
  constructor(bookmark) {
    this.name = bookmark.name;
    this.url = bookmark.url;
  }

  html() {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${this.url}">${this.name}</a>`;
    return li;
  }
}
