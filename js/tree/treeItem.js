// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
import Editor from "./edit/editor.js";
import EditorOptions from "./edit/editorOptions.js";
import editorTarget from "./edit/editorTarget.js";
import TreeUpdateEvent from "./edit/treeUpdateEvent.js";

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

  // returns a bookmark category html item
  html() {
    const li = document.createElement("li");
    this.root = li;
    li.classList.add("bookmark");
    li.setAttribute("id", this.id);

    const a = document.createElement("a");
    a.href = this.url;
    a.textContent = this.name;
    li.appendChild(a);
    if (this.isEditing) {
      li.addEventListener("click", (event) => {
        event.preventDefault();
        const parentNode = event.target.parentElement.parentElement;
        new Editor(
          parentNode,
          new editorTarget(this.name, this.url, this.id),
          new EditorOptions({
            openWithLinkInput: true,
            buttons: ["cancel", "delete", "link"],
          }),
          (editorFinishEvent) => {
            if (editorFinishEvent.type === "save") {
              this.name = editorFinishEvent.editResult.text;
              this.url = editorFinishEvent.editResult.link ?? "#";
              parentNode.insertBefore(
                this.html(),
                parentNode.querySelectorAll("li")[editorFinishEvent.index]
              );
            } else if (editorFinishEvent.type === "cancel") {
              parentNode.insertBefore(
                this.html(),
                parentNode.querySelectorAll("li")[editorFinishEvent.index]
              );
            } else if (editorFinishEvent.type === "delete") {
              this.onUpdate(
                new TreeUpdateEvent({ type: "delete", updatedObject: this })
              );
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
