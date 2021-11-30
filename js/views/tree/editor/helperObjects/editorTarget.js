// ====================================================== //
// ==================== EditorTarget ==================== //
// ====================================================== //

export default class editorTarget {
  constructor(text, url, id) {
    this.text = text ?? ""; // text to be edited
    this.url = url ?? "#"; // url to be edited
    this.id = id; // id of the edited item
  }
}
