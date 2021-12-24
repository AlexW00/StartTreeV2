// ====================================================== //
// ==================== ThemeChanger ==================== //
// ====================================================== //

import ThemeItem from "./themeItem.js";
import Button from "../../other/button.js";
export default class ThemeChanger {
  $themeChanger;
  $addThemeInput;
  themeColorsFromFile = [];
  selectedThemeId = 2;
  $selectedTheme; 
  currentThemeFromFile = false;
  rootForCSSVariables = document.querySelector(':root');
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
    this.$themeChanger = document.createElement("div");
    this.$addThemeInput = document.createElement("input");
    this.themeNr = config.nr ?? 0;
    this.changeTheme(this.THEMES[this.themeNr]);

    this.addListener();
    this.addListenerMouseLeave();
    window.changeThemeFromFile = this.changeThemeFromFile;
    window.themeChanger = this; 
  }    


  async changeThemeFromFile(file,t){ // t = this ($themeChanger)
    
    let text = await (new Response(file)).text();
    let temp;
    let nameTheme;
    try{
      // I think possible to rewrite this parsing more clean in future
      temp = JSON.parse(text);
      temp = temp[Object.keys(temp)[0]]; // To get inner object
      nameTheme = file.name.slice(0,-5).toLowerCase();// delete json file extension
     
      Object.keys(temp).forEach(element => {
        t.themeColorsFromFile.push(temp[element]);
      });
      if(!!(t.currentThemeFromFile)){
        t.$themeChanger.childNodes[0].remove();
      }
      t.$themeChanger.insertBefore(
        new ThemeItem(nameTheme,'selected').html(),
        t.$themeChanger.firstChild
      );
      t.changeTheme(nameTheme,true);
    } catch(err){
      console.error(err);
    }

  }

  changeTheme(nameTheme,themeIsFile = false){
    if(themeIsFile){
      for (let i = 0; i <= 15; i++) {
        this.rootForCSSVariables.style.setProperty(`--color${i}`, this.themeColorsFromFile[i+2]);
      }
      this.rootForCSSVariables.style.setProperty('--background', this.themeColorsFromFile[1]);
      this.rootForCSSVariables.style.setProperty('--foreground', this.themeColorsFromFile[0]);
      this.rootForCSSVariables.style.setProperty('--cursor', this.themeColorsFromFile[19]);
      this.currentThemeFromFile = true;
      this.themeColorsFromFile = [];
    
    }else if(this.currentThemeFromFile){
      
      if (this.$themeChanger.childNodes[0].childNodes[0].id !== nameTheme){//if chosen theme from file which do not exist

      this.$themeChanger.childNodes[0].remove();
      for (let i = 0; i <= 15; i++) {
        this.rootForCSSVariables.style.removeProperty(`--color${i}`);
      }
      this.rootForCSSVariables.style.removeProperty('--background');
      this.rootForCSSVariables.style.removeProperty('--foreground');
      this.rootForCSSVariables.style.removeProperty('--cursor');
      this.themeCssLink.href = `../themes/${nameTheme}.css`;
      this.currentThemeFromFile = false;
      this.themeColorsFromFile = [];
      }
    }else{
      this.themeCssLink.href = `../themes/${nameTheme}.css`;
      this.currentThemeFromFile = false;
      this.themeColorsFromFile = [];
    }
   
  }

  html() {
    const $root = document.createElement("div");
    $root.classList.add("prompt");

    const $themeChangerContainer = document.createElement("div");
    const $addThemeButton = new Button("add", 30, 30).html();

    const $addThemeInputLabel = document.createElement("label");

    this.$addThemeInput.setAttribute("id","add-theme-input")
    this.$addThemeInput.setAttribute("type", "file");
    this.$addThemeInput.setAttribute("onchange", "changeThemeFromFile(this.files[0],themeChanger)")
    this.$addThemeInput.setAttribute("accept", ".json");
    
    $addThemeInputLabel.setAttribute("for", "add-theme-input");
    $addThemeInputLabel.appendChild($addThemeButton);
    
    $addThemeButton.classList.add("add-theme-button");
    $addThemeButton.style.alignItems = "center";
    $themeChangerContainer.classList.add("theme-changer-container");
    const $h1 = document.createElement("h1");
    $h1.innerHTML = "theme:";
    this.$themeChanger.classList.add("theme-changer");

    this.THEMES.forEach((theme) => {
      const themeItem = new ThemeItem(theme);
      this.$themeChanger.appendChild(themeItem.html());
    });

    $themeChangerContainer.appendChild($h1);
    $themeChangerContainer.appendChild(this.$themeChanger);
    $themeChangerContainer.appendChild(this.$addThemeInput);
    $themeChangerContainer.appendChild($addThemeInputLabel);


    // Change id for selected theme div
    this.$themeChanger.childNodes[this.selectedThemeId].id = "selected";
    // Insert selected theme on the top
    this.$themeChanger.insertBefore(
      this.$themeChanger.childNodes[this.selectedThemeId],
      this.$themeChanger.firstChild
    );
    this.$selectedTheme = this.$themeChanger.childNodes[this.selectedThemeId];
    $root.appendChild($themeChangerContainer);
    return $root;
  }

  addListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.name === "theme-radio") {
        // print index of clicked element
        this.themeNr = this.THEMES.indexOf(e.target.id);
        this.changeTheme(e.target.id);
        const $selectedTheme = document.querySelector("#selected");
        $selectedTheme.removeAttribute("id");
        e.target.parentElement.id = "selected";
      }
    });
  };

  addListenerMouseLeave = () => {
    this.$themeChanger.addEventListener("mouseleave", (event)=> {
      const $selectedTheme = document.querySelector("#selected");
      const path = event.path || (event.composedPath && event.composedPath());
      path[0].insertBefore($selectedTheme, path[0].firstChild);
      event.target.scrollTop = 0;
    });
  };

  export = () => {
    return {
      nr: this.themeNr,
    };
  };
}