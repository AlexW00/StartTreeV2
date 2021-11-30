// ====================================================== //
// =================== TreeUpdateEvent ================== //
// ====================================================== //

export default class TreeUpdateEvent {
  constructor({ type, updatedObject }) {
    this.type = type; // "save", "cancel" or "delete"
    this.updatedObject = updatedObject; // the updated object
  }
}
