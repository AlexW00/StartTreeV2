// ====================================================== //
// ====================== EditTreeItem ================== //
// ====================================================== //

import DragOptions from "../../../../helper/dragOptions.js";
import makeDraggable from "../../../../helper/makeDraggable.js";
import { insertAfter } from "../../../../helper/utils.js";
import Button from "../../../other/button.js";
import TreeItem from "../../components/treeItem.js";
import Editor from "../editor/components/editor.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import TreeUpdateEvent from "../events/treeUpdateEvent.js";

export default class EditTreeItem extends TreeItem {
  constructor(bookmark, onUpdate) {
    super(bookmark);
    this.onUpdate = onUpdate;
  }

  // ~~~~~~~ override parent methods ~~~~~~ //

  html() {
    return this.root ?? this.renderHtml();
  }

  renderHtml() {
    this.root = super.renderHtml();
    this.editButton = this.editButtonHtml();
    this.root.appendChild(this.editButton);
    this.#makeDraggable();
    return this.root;
  }

  linkHtml() {
    const a = super.linkHtml();
    a.addEventListener("click", (event) => {
      event.preventDefault();
      this.#onBookmarkClick();
    });
    return a;
  }

  // ~~~~~~~ EditTreeItem methods ~~~~~~ //

  editButtonHtml() {
    const editButton = new Button("edit"),
      editButtonHtml = editButton.html();
    editButtonHtml.classList.add("bookmark-link-edit-button");
    return editButtonHtml;
  }

  #makeDraggable = () => {
    const dragOptionsData = this.export();
    dragOptionsData.classList = ["bookmark"];
    const dragOptions = new DragOptions({
      data: JSON.stringify(dragOptionsData),
      validDropzones: ["bookmark"],
    });

    makeDraggable(this.root, dragOptions, (type, event) => {
      if (type === "dragend") {
        this.#delete();
      } else if (type === "drop") {
        this.#onDrop(event);
      }
    });
  };

  // valid element is dropped on this element
  #onDrop(event) {
    const dragItemData = JSON.parse(event.dataTransfer.getData("text")),
      newEditTreeItem = new EditTreeItem(
        { n: dragItemData.n, u: dragItemData.u },
        this.onUpdate
      );

    // insert dragged item after it's dropzone
    insertAfter(newEditTreeItem.html(), this.root);
    this.onUpdate(
      new TreeUpdateEvent({
        type: "add",
        updatedObject: this,
        newObject: newEditTreeItem,
      })
    );
  }

  #delete() {
    this.root.remove();
    this.onUpdate(new TreeUpdateEvent({ type: "delete", updatedObject: this }));
  }

  // creates a new editor and adds it to the DOM
  #onBookmarkClick = () => {
    const parentNode = this.root.parentNode;
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
            this.renderHtml(),
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
}
