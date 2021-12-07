// ====================================================== //
// ==================== ThemeChanger ==================== //
// ====================================================== //

import ThemeItem from "./themeItem.js";
export default class ThemeChanger {
  themeChanger = document.createElement("div");
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

    root.appendChild(themeChangerContainer);
    return root;
  }

  addListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.name === "theme-radio") {
        const selectedTheme = e.path[1];
        // print index of clicked element
        this.themeNr = this.THEMES.indexOf(e.target.id);
        this.changeTheme(e.target.id);
        selectedTheme.remove();
        const themeChanger = document.querySelector('theme-changer');
        this.themeChanger.insertBefore(selectedTheme, this.themeChanger.firstChild);
      }
    });
  };

  addListenerMouseLeave = () => {
    this.themeChanger.addEventListener("mouseleave", function(event) {
      
     event.target.scrollTop = 0;

    });
  };

  export = () => {
    return {
      nr: this.themeNr,
    };
  };
}
