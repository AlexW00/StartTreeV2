// ====================================================== //
// ======================= Editor ======================= //
// ====================================================== //

import EditorFinishEvent from "../events/editorFinishEvent.js";
import Toolbar from "./toolbar.js";
export default class Editor {
  static openInstance = null;

  // ~~~~~~~~~ Initialization functions ~~~~~~~~~ //

  constructor(parentNode, editorTarget, editorOptions, cb) {
    this.cb = cb; // callback function
    this.buttons = editorOptions.buttons; // ["link", "delete", "cancel"];
    this.parentNode = parentNode; // the parent node of the edit target
    this.editorTarget = editorTarget; // the edit target
    this.text = editorTarget.text; // the text of the edit target
    this.link = editorTarget.url; // the link of the edit target
    this.linkEditorIsOpen = editorOptions.openWithLinkInput; // whether or not to open the link input when the editor is opened
    this.allowTextEdit = editorOptions.allowTextEdit; // whether or not to allow the user to edit the text of the editor
    this.nodeType = editorOptions.nodeType; // the type of node to append the editor as

    this.#checkIfEditorIsOpen();
    this.#replaceEditorTarget();
  }

  #checkIfEditorIsOpen() {
    if (Editor.openInstance != null) Editor.openInstance.close();
    Editor.openInstance = this;
  }

  // replaces the target element with this editor
  #replaceEditorTarget() {
    this.parentNode.replaceChild(
      this.html(),
      this.parentNode.querySelector("#" + this.editorTarget.id)
    );

    const children = this.parentNode.children;
    // loop over all
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("editor")) {
        this.index = i;
        break;
      }
    }
  }

  // ~~~~~~ Html generating functions ~~~~~~ //

  // returns the html for this editor
  html() {
    const li = document.createElement(this.nodeType);
    li.classList.add("editor");
    const firstRow = document.createElement("div");
    firstRow.classList.add("firstRow");
    firstRow.appendChild(this.#createInputField(li));
    firstRow.appendChild(this.#createToolbar(li));
    li.appendChild(firstRow);
    if (this.linkEditorIsOpen) this.#openLinkInput(li);
    return li;
  }

  // creates an input field
  #createInputField(li) {
    // create input field
    const input = document.createElement("input");
    input.addEventListener("focusout", () => {
      setTimeout(() => {
        if (!li.contains(document.activeElement)) {
          this.save();
        }
      });
    });
    input.addEventListener("focus", () => {
      input.setAttribute("draggable", "false");
      input.parentNode.setAttribute("draggable", "false");
      input.parentNode.parentNode.setAttribute("draggable", "false");
    });
    input.type = "text";
    input.value = this.text;
    input.addEventListener("keydown", (e) => {
      this.text = input.value;
      if (e.keyCode === 13 && input === document.activeElement) {
        this.save(li.parentNode);
      }
    });
    if (!this.allowTextEdit) input.disabled = true;
    return input;
  }

  // creates the toolbar html
  #createToolbar(li) {
    return new Toolbar(this.buttons, (buttonName) => {
      if (buttonName === "cancel") {
        this.close();
      } else if (buttonName === "delete") {
        this.delete();
      } else if (buttonName === "link") {
        this.#toggleLinkInput(li);
      }
    }).html();
  }

  #toggleLinkInput(li) {
    if (this.linkEditorIsOpen) this.#closeLinkInput(li);
    else this.#openLinkInput(li);
  }

  #openLinkInput(li) {
    this.linkEditorIsOpen = true;
    const secondRow = document.createElement("div");
    secondRow.classList.add("secondRow");

    const input = document.createElement("input");
    input.addEventListener("focusout", (event) => {
      setTimeout(() => {
        if (!li.contains(document.activeElement)) {
          this.save();
        }
      });
    });
    input.type = "text";
    input.value = this.link;
    input.addEventListener("keydown", (e) => {
      this.link = input.value;
      if (e.keyCode === 13 && input === document.activeElement) {
        e.preventDefault();
        this.save(li.parentNode);
      }
    });
    secondRow.appendChild(input);
    li.appendChild(secondRow);
  }

  #closeLinkInput(li) {
    this.linkEditorIsOpen = false;
    li.querySelector(".secondRow").remove();
  }

  // ~~~~~~~ Toolbar event callbacks ~~~~~~ //

  save() {
    if (this.isClosed) return;
    this.#remove();
    this.cb(
      new EditorFinishEvent(
        "save",
        { text: this.text, link: this.link },
        this.index
      )
    );
  }

  close() {
    this.#remove();
    this.cb(
      new EditorFinishEvent(
        "cancel",
        { text: this.text, link: this.link },
        this.index
      )
    );
  }

  delete() {
    this.#remove();
    this.cb(new EditorFinishEvent("delete", null, this.index));
  }

  #remove() {
    this.isClosed = true;
    console.trace();
    const el = this.parentNode.querySelector(".editor");
    if (!el) return;

    this.parentNode.removeChild(el);
    Editor.openInstance = null;
  }
}
