// ====================================================== //
// ==================== ThemeChanger ==================== //
// ====================================================== //

import ThemeItem from "./themeItem.js";
export default class ThemeChanger {
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
  ];

  themeCssLink = document.querySelector("link[href='./styles/colors.css']");

  constructor(config) {
    console.log(config);
    this.themeNr = config.nr ?? 0;
    this.addListener();
    this.changeTheme(this.THEMES[this.themeNr]);
  }

  changeTheme(nameTheme) {
    this.themeCssLink.href = `./themes/${nameTheme}.css`;
  }

  html() {
    const root = document.createElement("div");
    root.classList.add("prompt");

    const sectionName = document.createElement("div");
    sectionName.innerHTML = "~";
    const themeSpan = document.createElement("span");
    themeSpan.innerHTML = " Ξ ";
    sectionName.appendChild(themeSpan);
    sectionName.innerHTML += "theme";
    root.appendChild(sectionName);

    const themeChangerContainer = document.createElement("div");
    themeChangerContainer.classList.add("theme-changer-container");
    const h1 = document.createElement("h1");
    h1.innerHTML = "theme:";
    const themeChanger = document.createElement("div");
    themeChanger.classList.add("theme-changer");

    this.THEMES.forEach((theme) => {
      const themeItem = new ThemeItem(theme);
      themeChanger.appendChild(themeItem.html());
    });

    themeChangerContainer.appendChild(h1);
    themeChangerContainer.appendChild(themeChanger);

    root.appendChild(themeChangerContainer);
    return root;
  }

  addListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.name === "theme-radio") {
        // print index of clicked element
        this.themeNr = this.THEMES.indexOf(e.target.id);
        this.changeTheme(e.target.id);
      }
    });
  };

  export = () => {
    return {
      nr: this.themeNr,
    };
  };
}
