import EditTree from "../views/tree/editTree/components/editTree.js";
import { parse, stringify } from "../helper/jsurl.js";
import Button from "../views/other/button.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const treeConfig = parse(urlParams.get("t")) || {};

const t = new EditTree(treeConfig, true);
document.body.appendChild(t.html());

// ADD NEW BUTTON
const cancelButton = new Button("cancelExport").html();
cancelButton.classList.add("modeToggle", "left");
cancelButton.setAttribute("data-tooltip", "Discard all changes and go back");

cancelButton.addEventListener("click", () => {
  window.history.back();
});
document.body.appendChild(cancelButton);

const exportButton = new Button("export").html();
exportButton.classList.add("modeToggle", "right");
exportButton.setAttribute("data-tooltip", "Copy & Go to the new URL");

exportButton.addEventListener("click", () => {
  navigator.clipboard.writeText(getExportUrl());
  window.location.href = getExportUrl();
});
document.body.appendChild(exportButton);

const getExportUrl = () => {
  const host = "//" + location.host,
    path = location.pathname,
    affix = "?t=",
    data = stringify(t.export());
  return host + path.replace("e.html", "v.html") + affix + data;
};
