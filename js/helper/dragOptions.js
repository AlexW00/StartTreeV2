export default class DragOptions {
  constructor({ data, validDropzones, validDragItems }) {
    this.data = data ?? "";
    this.validDropzones = validDropzones ?? []; // classes this draggable can be dropped into
    this.validDragItems = validDragItems ?? []; // classes that can be dropped on this draggable
  }
}
