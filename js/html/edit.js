import Tree from "/js/views/tree/components/tree.js";
import { parse, stringify } from "../helper/jsurl.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const treeConfig = parse(urlParams.get("t")) || {};

const t = new Tree(treeConfig, true);
document.body.appendChild(t.html());
let modeLink = document.getElementById("modeToggle");
modeLink.setAttribute("href", modeLink.href + queryString);

// ADD NEW BUTTON
const addButton = document.createElement("button");
addButton.innerText = "export";
addButton.addEventListener("click", () => {
  const exportData = t.export();
  const jsonStringified = stringify(exportData);
  console.log(jsonStringified);
});
document.body.appendChild(addButton);
