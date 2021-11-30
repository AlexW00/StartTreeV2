// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
//
import Editor from "../editor/components/editor.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import TreeUpdateEvent from "../events/treeUpdateEvent.js";

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
    // creates a li element with the id of this.id, and the class of "bookmark-category"
    const li = document.createElement("li");
    this.root = li;
    li.classList.add("bookmark");
    li.setAttribute("id", this.id);

    // creates a link element with the href of this.url, and the text of this.name
    const a = document.createElement("a");
    a.href = this.url;
    a.textContent = this.name;
    li.appendChild(a);

    // adds an onclick event listener to the link element if edit mode is on
    if (this.isEditing) {
      li.addEventListener("click", (event) => {
        this.#onBookmarkClick(event);
      });
    }
    return li;
  }

  // creates a new editor and adds it to the DOM
  #onBookmarkClick = (event) => {
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
  };

  export() {
    return {
      n: this.name,
      u: this.url,
    };
  }
}
