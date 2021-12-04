// ====================================================== //
// ======================= Toolbar ====================== //
// ====================================================== //

import Button from "../../../../other/button.js";
export default class Toolbar {
  constructor(buttons, cb) {
    this.cb = cb; // callback function
    this.buttons = buttons; // ["link", "delete", "cancel"];
  }

  // ~~~~~~ Html generating function ~~~~~~ //

  // returns the html of the toolbar

  html() {
    const toolBar = document.createElement("div");
    toolBar.classList.add("editToolbar");

    if (this.buttons.includes("link")) {
      this.linkButton = new Button("link").html();
      this.linkButton.addEventListener("click", () => {
        this.cb("link");
      });
      toolBar.appendChild(this.linkButton);
    }
    if (this.buttons.includes("delete")) {
      this.deleteButton = new Button("delete").html();
      this.deleteButton.addEventListener("click", () => {
        this.cb("delete");
      });
      toolBar.appendChild(this.deleteButton);
    }

    if (this.buttons.includes("cancel")) {
      this.cancelButton = new Button("cancel").html();
      this.cancelButton.addEventListener("click", () => {
        this.cb("cancel");
      });
      toolBar.appendChild(this.cancelButton);
    }
    return toolBar;
  }
}
