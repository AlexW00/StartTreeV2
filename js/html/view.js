import Tree from "/js/views/tree/components/tree.js";
import { parse } from "../helper/jsurl.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const treeConfig = parse(urlParams.get("t")) || {};

console.log(treeConfig);
const t = new Tree(treeConfig, false);
document.body.appendChild(t.html());

let modeLink = document.getElementById("modeToggle");
modeLink.setAttribute("href", modeLink.href + queryString);
