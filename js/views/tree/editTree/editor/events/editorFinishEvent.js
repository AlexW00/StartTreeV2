// ====================================================== //
// ================== EditorFinishEvent ================= //
// ====================================================== //

export default class EditorFinishEvent {
  constructor(type, editResult, index) {
    this.type = type; // either "save", "cancel" or "delete"
    this.editResult = editResult; // { text, link }
    this.index = index; // index of the edited item in the parent node
  }
}
