export default class editorTarget {
  constructor(text, url, id) {
    this.text = text;
    this.url = url ?? "#";
    this.id = id;
  }
}
