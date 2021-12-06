import EditTree from "../views/tree/editTree/components/editTree.js";
import { parse, stringify } from "../helper/jsurl.js";
import Button from "../views/other/button.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const treeConfig = parse(urlParams.get("t")) || {};
const REPO_URL = "https://github.com/AlexW00/StartTreeV2";

const t = new EditTree(treeConfig, true);
document.body.appendChild(t.html());

const getExportUrl = () => {
  const host = window.location.protocol + "//" + location.host,
    path = location.pathname,
    affix = "?t=",
    data = stringify(t.export());
  return host + path.replace("e.html", "v.html") + affix + data;
};

const cancelButtonHtml = () => {
  const cancelButton = new Button("cancelExport", 30, 30).html();
  cancelButton.classList.add("modeToggle", "right", "top");
  cancelButton.style.right = "3px";
  cancelButton.style.top = "50px";
  cancelButton.setAttribute("data-tooltip", "Discard all changes and go back");

  cancelButton.addEventListener("click", () => {
    window.history.back();
  });
  return cancelButton;
};

const exportButtonHtml = () => {
  const exportButton = new Button("export", 35, 35).html();
  exportButton.classList.add("modeToggle", "right", "top");
  exportButton.setAttribute("data-tooltip", "Copy & Go to the new URL");

  exportButton.addEventListener("click", () => {
    navigator.clipboard.writeText(getExportUrl());
    window.location.href = getExportUrl();
  });
  return exportButton;
};

const infoButtonHtml = () => {
  const infoButton = new Button("help", 35, 35).html();
  infoButton.classList.add("modeToggle", "right", "bottom", "big");
  infoButton.setAttribute("data-html", "true");
  infoButton.setAttribute(
    "data-tooltip",
    `Click to edit.\nDrag to move.\nMore info: click this button :)`
  );

  infoButton.addEventListener("click", () => {
    window.location.href = REPO_URL;
  });

  return infoButton;
};

document.body.appendChild(cancelButtonHtml());
document.body.appendChild(exportButtonHtml());
document.body.appendChild(infoButtonHtml());
