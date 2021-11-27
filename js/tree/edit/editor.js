export default class Editor {
  constructor(parentNode, editTarget) {
    this.parentNode = parentNode;
    this.editTarget = editTarget;
    this.text = editTarget.name;
    console.log(this);
  }

  html() {}
}
