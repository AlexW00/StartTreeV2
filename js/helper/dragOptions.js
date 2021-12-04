export default class DragOptions {
  constructor({ data, validDropzones }) {
    this.data = data ?? "";
    this.validDropzones = validDropzones ?? []; // classes that this draggable can be dropped on
  }
}
