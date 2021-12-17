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
    this.root = this.html();
    this.parentNode.replaceChild(
      this.root,
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
    li.setAttribute("draggable", "true");
    li.ondragstart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    };
    li.classList.add("editor");
    const firstRow = document.createElement("div");
    firstRow.classList.add("firstRow");
    firstRow.appendChild(this.#createInputField(li));
    firstRow.appendChild(this.#createToolbar(li));

    li.appendChild(firstRow);
    if (this.linkEditorIsOpen) li.appendChild(this.#secondRowHtml());
    this.#setMouseDownListener();
    return li;
  }

  #setMouseDownListener = () => {
    document.addEventListener("mousedown", (e) => {
      if (this.root.contains(e.target)) return;
      this.save();
    });
  };

  #secondRowHtml = () => {
    this.linkEditorIsOpen = true;
    const secondRow = document.createElement("div");

    this.secondRow = secondRow;
    secondRow.classList.add("secondRow");
    this.toolbar.linkButton.classList.add("active");

    const input = document.createElement("input");

    input.type = "text";
    input.value = this.link;
    input.addEventListener("keyup", (e) => {
      this.link = input.value;
      if (e.keyCode === 13 && input === document.activeElement) {
        e.preventDefault();
        this.save(this.root.parentNode);
      }
    });

    secondRow.appendChild(input);
    return secondRow;
  };

  // creates an input field
  #createInputField(li) {
    // create input field
    const input = document.createElement("input");

    input.type = "text";
    input.value = this.text;
    input.addEventListener("keyup", (e) => {
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
    this.toolbar = new Toolbar(this.buttons, (buttonName) => {
      console.log(buttonName);
      if (buttonName === "cancel") {
        this.close();
      } else if (buttonName === "delete") {
        this.delete();
      } else if (buttonName === "link") {
        this.#toggleLinkInput(li);
      }
    });
    return this.toolbar.html();
  }

  #toggleLinkInput(li) {
    if (this.linkEditorIsOpen) {
      this.#closeLinkInput(li);
      this.toolbar.linkButton.classList.remove("active");
    } else {
      this.#openLinkInput(li);
      this.toolbar.linkButton.classList.add("active");
    }
  }

  #openLinkInput(li) {
    li.appendChild(this.#secondRowHtml());
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
    this.#closeLinkInput().then(() => {
      this.root.classList.add("scale-animate-out");
      this.root.onanimationend = () => {
        this.#remove();
        this.cb(new EditorFinishEvent("delete", null, this.index));
      };
    });
  }

  #closeLinkInput() {
    if (!this.linkEditorIsOpen) return Promise.resolve();
    return new Promise((resolve) => {
      const linkInput = this.root.querySelector(".secondRow");
      linkInput.classList.add("slide-down-animate-out");
      linkInput.onanimationend = () => {
        this.linkEditorIsOpen = false;
        linkInput.remove();
        resolve();
      };
    });
  }

  #remove() {
    this.isClosed = true;
    Editor.openInstance = null;
    if (this.root) this.root.remove();
  }
}
