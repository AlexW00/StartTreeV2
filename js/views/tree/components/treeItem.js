// ====================================================== //
// ====================== TreeItem ====================== //
// ====================================================== //
//
import DragOptions from "../../../helper/dragOptions.js";
import makeDraggable from "../../../helper/makeDraggable.js";
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
    li.classList.add("bookmark");
    li.setAttribute("id", this.id);
    this.root = li;

    // creates a link element with the href of this.url, and the text of this.name
    const a = document.createElement("a");
    a.href = this.#generateLinkText(this.url);
    a.textContent = this.name;
    li.appendChild(a);

    // adds an onclick event listener to the link element and makes root draggable if edit mode is on
    if (this.isEditing) {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        this.#onBookmarkClick(event);
      });
      this.#makeDraggable();
    }
    return li;
  }

  #generateLinkText(url) {
    // if the url has a protocol, return the url, else append a protocol
    if (url.includes("//")) {
      return url;
    } else return "//" + url;
  }

  #makeDraggable = () => {
    const dragOptionsData = this.export();
    dragOptionsData.classList = ["bookmark"];
    const dragOptions = new DragOptions({
      data: JSON.stringify(dragOptionsData),
      validDropzones: ["bookmark", "category"],
      validDragItems: ["bookmark"],
    });

    makeDraggable(this.root, dragOptions, (type, event) => {
      switch (type) {
        // called when this element is dropped successfully
        case "dragend": {
          this.#delete();
          break;
        }
        // called when a valid draggable is dropped on top of this element
        case "drop": {
          this.#onDrop(event);
          break;
        }
      }
    });
  };

  // valid element is dropped on this element
  #onDrop(event) {
    const dropzone = event.currentTarget;

    const dragItemData = JSON.parse(event.dataTransfer.getData("text"));
    const draggedItem = new TreeItem(
      { n: dragItemData.n, u: dragItemData.u },
      this.isEditing,
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
  }

  #delete() {
    this.root.remove();
    this.onUpdate(new TreeUpdateEvent({ type: "delete", updatedObject: this }));
  }

  // creates a new editor and adds it to the DOM
  #onBookmarkClick = (event) => {
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
