// ====================================================== //
// ==================== ThemeChanger ==================== //
// ====================================================== //

import ThemeItem from "./themeItem.js";
export default class ThemeChanger {
  themeChanger = document.createElement("div");
  selectedThemeId = 2;

  // all themes, hardcorded currently
  THEMES = [
    "black-ice",
    "carnival",
    "cotton-candy",
    "desert-sky",
    "ferns",
    "forest",
    "gruvbox",
    "intrigue",
    "just-red",
    "neon-pink-dark",
    "neon",
    "orange-dark",
    "slick-red",
    "this-ones-good",
    "tomorrow-night-eighties",
    "void",
    "water-fire",
    "storm",
    "gold-hunter",
    "sierra",
    "capitane",
    "bigsur",
    "monterey",
    "nord",
    "MonokaiPro",
    "Programiz",
    "autumn-mech"
  ];

  themeCssLink = document.querySelector("link[href='../styles/colors.css']");

  constructor(config) {
    this.themeNr = config.nr ?? 0;
    this.addListener();
    this.addListenerMouseLeave();
    this.changeTheme(this.THEMES[this.themeNr]);
  }

  changeTheme(nameTheme) {
    this.themeCssLink.href = `../themes/${nameTheme}.css`;
  }

  html() {
    const root = document.createElement("div");
    root.classList.add("prompt");

    const themeChangerContainer = document.createElement("div");
    themeChangerContainer.classList.add("theme-changer-container");
    const h1 = document.createElement("h1");
    h1.innerHTML = "theme:";
    this.themeChanger.classList.add("theme-changer");

    this.THEMES.forEach((theme) => {
      const themeItem = new ThemeItem(theme);
      this.themeChanger.appendChild(themeItem.html());
    });

    themeChangerContainer.appendChild(h1);
    themeChangerContainer.appendChild(this.themeChanger);
    // Change id for selected theme div
    this.themeChanger.childNodes[this.selectedThemeId].id = "selected";
    // Insert selected theme on the top
    this.themeChanger.insertBefore(
      this.themeChanger.childNodes[this.selectedThemeId],
      this.themeChanger.firstChild
    );

    root.appendChild(themeChangerContainer);
    return root;
  }

  addListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.name === "theme-radio") {
        // print index of clicked element
        this.themeNr = this.THEMES.indexOf(e.target.id);
        this.changeTheme(e.target.id);

        const selectedTheme = document.querySelector("#selected");
        selectedTheme.removeAttribute("id");
        e.target.parentElement.id = "selected";
      }
    });
  };

  addListenerMouseLeave = () => {
    this.themeChanger.addEventListener("mouseleave", function (event) {
      const selectedTheme = document.querySelector("#selected");
      const path = event.path || (event.composedPath && event.composedPath());
      path[0].insertBefore(selectedTheme, path[0].firstChild);
      event.target.scrollTop = 0;
    });
  };

  export = () => {
    return {
      nr: this.themeNr,
    };
  };
}
