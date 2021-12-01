// ====================================================== //
// =================== TreeUpdateEvent ================== //
// ====================================================== //

export default class TreeUpdateEvent {
  constructor({ type, updatedObject, newObject }) {
    this.type = type; // "save", "cancel", "delete" or "move"
    this.updatedObject = updatedObject; // the updated object
    this.newObject = newObject; // the new object
  }
}
