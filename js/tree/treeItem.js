// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
import Button from "./edit/button.js";

export default class TreeItem {
  constructor(bookmark, isEditing) {
    this.name = bookmark.n;
    this.url = bookmark.u;
    this.isEditing = isEditing;
  }

  // returns a bookmark category item
  html() {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = this.url;
    a.textContent = this.name;
    li.appendChild(a);
    return li;
  }

  export() {
    return {
      n: this.name,
      u: this.url,
    };
  }
}
