import Button from "./button.js";

// Types of buttons: cancel, delete, link
export default class Toolbar {
  constructor(buttons, cb) {
    this.cb = cb;
    this.buttons = buttons;
  }

  html() {
    const toolBar = document.createElement("div");
    toolBar.classList.add("editToolbar");

    console.log(this.buttons);
    if (this.buttons.includes("link")) {
      const linkButton = new Button("link").html();
      linkButton.addEventListener("click", () => {
        this.cb("link");
      });
      toolBar.appendChild(linkButton);
    }
    if (this.buttons.includes("delete")) {
      const deleteButton = new Button("delete").html();
      deleteButton.addEventListener("click", () => {
        this.cb("delete");
      });
      toolBar.appendChild(deleteButton);
    }

    if (this.buttons.includes("cancel")) {
      const cancelButton = new Button("cancel").html();
      cancelButton.addEventListener("click", () => {
        this.cb("cancel");
      });
      toolBar.appendChild(cancelButton);
    }
    return toolBar;
  }
}
