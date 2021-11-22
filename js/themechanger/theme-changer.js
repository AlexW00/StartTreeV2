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

  constructor() {
    this.addListener();
  }

  changeTheme(nameTheme) {
    this.themeCssLink.href = `./themes/${nameTheme}.css`;
  }

  html() {
    const root = document.createElement("div");

    const themePrompt = document.createElement("span");
    themePrompt.innerHTML = "~";
    const themeSpan = document.createElement("span");
    themeSpan.innerHTML = "λ";
    themePrompt.appendChild(themeSpan);
    themePrompt.innerHTML += "theme";
    root.appendChild(themePrompt);

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
        this.changeTheme(e.target.id);
      }
    });
  };
}
