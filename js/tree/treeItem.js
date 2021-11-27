// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
import Editor from "./edit/editor.js";

export default class TreeItem {
  static count = 0;
  constructor(bookmark, isEditing, onUpdate) {
    TreeItem.count++;
    this.onUpdate = onUpdate;
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
    if (this.isEditing) {
      li.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(this);
        const root = event.target.parentElement.parentElement;
        const editor = new Editor(
          root,
          this,
          ["cancel", "delete", "link"],
          true,
          (event) => {
            if (event.type === "save") {
              this.name = event.editResult.text;
              this.url = event.editResult.link ?? "#";
              console.log(event.editResult.index);
              root.insertBefore(
                this.html(),
                root.querySelectorAll("li")[event.index]
              );
            } else if (event.type === "close") {
              root.appendChild(this.html());
            } else if (event.type === "delete") {
              this.onUpdate({ type: "delete", bookmark: this });
            }
          }
        );
      });
    }
    return li;
  }

  export() {
    return {
      n: this.name,
      u: this.url,
    };
  }
}
