export default class TreeUpdateEvent {
  constructor({ type, updatedObject }) {
    this.type = type;
    this.updatedObject = updatedObject;
  }
}
