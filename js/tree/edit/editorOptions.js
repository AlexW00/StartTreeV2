export default class EditorOptions {
  constructor({ allowTextEdit, openWithLinkInput, buttons, nodeType }) {
    this.allowTextEdit = allowTextEdit ?? true;
    this.openWithLinkInput = openWithLinkInput ?? false;
    this.buttons = buttons ?? ["cancel", "delete"];
    this.nodeType = nodeType ?? "li";
  }
}
