// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
//
import { insertAfter } from "../../../helper/utils.js";
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
    li.classList.add("dropzone");
    li.classList.add("bookmark");

    // make the li element draggable
    li.draggable = true;

    li.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", JSON.stringify(this.export()));
      event.currentTarget.classList.add("drag-item");
    });

    li.addEventListener("dragend", (event) => {
      event.preventDefault();
      if (event.dataTransfer.dropEffect != "none") {
        this.#delete();
      }
      event.currentTarget.classList.remove("drag-item");
    });

    li.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    li.addEventListener("dragenter", (event) => {
      event.preventDefault();
      event.currentTarget.classList.add("drag-under-item");
      return false;
    });
    li.addEventListener("dragleave", (event) => {
      event.preventDefault();

      event.currentTarget.classList.remove("drag-under-item");
    });
    li.addEventListener("drop", (event) => {
      event.preventDefault();
      const dropzone = event.currentTarget;
      dropzone.classList.remove("drag-under-item");
      const data = JSON.parse(event.dataTransfer.getData("text"));
      const draggedItem = new TreeItem(
        { n: data.n, u: data.u },
        data.isEditing,
        this.onUpdate
      );
      const draggedItemHtml = draggedItem.html();

      // insert dragged item after it's dropzone
      insertAfter(draggedItemHtml, dropzone);
      this.onUpdate(
        new TreeUpdateEvent({
          type: "add",
          updatedObject: this.root,
          newObject: draggedItem,
        })
      );
    });

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
      a.addEventListener("click", (event) => {
        event.preventDefault();
        this.#onBookmarkClick(event);
      });
    }
    return li;
  }
  #delete() {
    this.root.remove();
    this.onUpdate(
      new TreeUpdateEvent({ type: "delete", updatedObject: this.root })
    );
  }

  // creates a new editor and adds it to the DOM
  #onBookmarkClick = (event) => {
    console.log(event.target);
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
