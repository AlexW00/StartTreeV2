import { stringify } from "../helper/jsurl.js";

const exampleData = await fetch("./js/views/tree/exampleConfig.json").then(
  (response) => response.json()
);

const jsonStringified = stringify(exampleData);

/* const button = document.createElement("h1");
const a = document.createElement("a");

a.href = `v.html?t=${jsonStringified}`;
a.innerText = "Open tree";
button.appendChild(a);
document.body.appendChild(button); */

location.href = `./html/v.html?t=${jsonStringified}`;
