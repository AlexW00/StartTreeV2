import jsurl from "../helper/jsurl.js";
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
  root = document.querySelector(".theme-changer");

  constructor() {
    this.loadThemes();
    this.addListener();
  }

  changeTheme(nameTheme) {
    this.themeCssLink.href = `./themes/${nameTheme}.css`;
  }

  loadThemes() {
    this.THEMES.forEach((theme) => {
      const themeItem = new ThemeItem(theme);
      this.root.appendChild(themeItem.html());
    });
  }

  addListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.name === "theme-radio") {
        this.changeTheme(e.target.id);
      }
    });
  };
}
