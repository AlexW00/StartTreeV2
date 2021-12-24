// ====================================================== //
// ====================== ThemeItem ===================== //
// ====================================================== //

export default class ThemeItem {
  static themeCssLink = document.querySelector(
    "link[href='./styles/colors.css']"
  );

  constructor(themeName,divId = null) {
    this.name = themeName;
    this.divId = divId;
  }

  // returns a theme item html item
  html() {
    const div = document.createElement("div");
    const input = document.createElement("input");
    if(this.divId !== null) {
      div.id = this.divId;
    }
    input.type = "radio";
    input.name = "theme-radio";
    input.id = this.name;
    const label = document.createElement("label");
    label.htmlFor = this.name;
    label.innerHTML = this.name;
    div.appendChild(input);
    div.appendChild(label);
    return div;
  }
}
