import Button from "./button.js";
import EditorFinishEvent from "./editorFinishEvent.js";
import Toolbar from "./toolbar.js";
export default class Editor {
  constructor(parentNode, editorTarget, editorOptions, cb) {
    this.cb = cb;
    this.buttons = editorOptions.buttons;
    this.parentNode = parentNode;
    this.editorTarget = editorTarget;
    this.text = editorTarget.name ?? editorTarget.text;
    this.link = editorTarget.url ?? "#";
    this.linkEditorIsOpen = editorOptions.openWithLinkInput ?? false;
    this.allowTextEdit = editorOptions.allowTextEdit ?? true;
    this.nodeType = editorOptions.nodeType;

    this.#replaceTargetWithEditor();
  }

  // replace the target element with this editor
  #replaceTargetWithEditor() {
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

  html() {
    const li = document.createElement(this.nodeType);
    li.classList.add("editor");

    const firstRow = document.createElement("div");
    firstRow.classList.add("firstRow");

    // create input field

    const input = document.createElement("input");
    input.addEventListener("focusout", (event) => {
      console.log(document.activeElement);
      setTimeout(() => {
        if (!li.contains(document.activeElement)) {
          this.save();
        }
      });
    });
    input.type = "text";
    input.value = this.text;
    input.addEventListener("keydown", (e) => {
      this.text = input.value;
      if (e.keyCode === 13) {
        this.save();
      }
    });
    if (!this.allowTextEdit) input.disabled = true;

    firstRow.appendChild(input);

    // create toolbar
    const toolBar = new Toolbar(this.buttons, (buttonName) => {
      if (buttonName === "cancel") {
        this.close();
      } else if (buttonName === "delete") {
        this.delete();
      } else if (buttonName === "link") {
        this.#toggleLinkInput(li);
      }
    }).html();
    firstRow.appendChild(toolBar);

    li.appendChild(firstRow);
    if (this.linkEditorIsOpen) this.#openLinkInput(li);

    return li;
  }

  save() {
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
      if (e.keyCode === 13) {
        this.save();
      }
    });
    secondRow.appendChild(input);
    li.appendChild(secondRow);
  }

  #closeLinkInput(li) {
    this.linkEditorIsOpen = false;
    li.querySelector(".secondRow").remove();
  }

  #remove() {
    const el = this.parentNode.querySelector(".editor");
    this.parentNode.removeChild(el);
  }
}
