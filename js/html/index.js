import { stringify } from "../helper/jsurl.js";

const exampleData = await fetch("/js/tree/exampleConfig.json").then(
  (response) => response.json()
);

const jsonStringified = stringify(exampleData);

const button = document.createElement("h1");
const a = document.createElement("a");
a.href = `http://127.0.0.1:5500/html/v.html?t=${jsonStringified}`;
a.innerText = "Open tree";
button.appendChild(a);
document.body.appendChild(button);
