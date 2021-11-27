// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
import Button from "./edit/button.js";

export default class TreeItem {
  static count = 0;
  constructor(bookmark, isEditing) {
    TreeItem.count++;
    this.id = `bookmark-${TreeItem.count}`;
    this.name = bookmark.n;
    this.url = bookmark.u;
    this.isEditing = isEditing;
  }

  // returns a bookmark category item
  html() {
    const li = document.createElement("li");
    li.setAttribute("id", this.id);
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
