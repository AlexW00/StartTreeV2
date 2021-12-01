// ====================================================== //
// =================== TreeUpdateEvent ================== //
// ====================================================== //

export default class TreeUpdateEvent {
  constructor({ type, updatedObject }) {
    this.type = type; // "save", "cancel", "delete" or "move"
    this.updatedObject = updatedObject; // the updated object
  }
}
