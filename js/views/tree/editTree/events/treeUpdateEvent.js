// ====================================================== //
// =================== TreeUpdateEvent ================== //
// ====================================================== //

export default class TreeUpdateEvent {
  static legalTypes = ["save", "delete", "add"];

  constructor({ type, updatedObject, newObject }) {
    this.type = this.checkType(type); // event type, must be one of legalTypes
    this.updatedObject = updatedObject; // the updated object
    this.newObject = newObject; // the new object (if available)
  }

  checkType(type) {
    if (!TreeUpdateEvent.legalTypes.includes(type)) {
      throw new Error(
        "TreeUpdateEvent: type must be 'save', 'cancel', or 'delete'. Found: " +
          this.type
      );
    } else return type;
  }
}
