import Tree from "/js/views/tree/components/tree.js";
import { parse, stringify } from "../helper/jsurl.js";
import Button from "../views/other/button.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const exportUrlPrefix = location.host + location.pathname + "?t=";
const treeConfig = parse(urlParams.get("t")) || {};

const t = new Tree(treeConfig, true);
document.body.appendChild(t.html());

// ADD NEW BUTTON
const cancelButtonRoot = document.createElement("div");
cancelButtonRoot.setAttribute("id", "modeToggle");
cancelButtonRoot.setAttribute(
  "data-tooltip",
  "Discard changes all and go back"
);
const cancelButton = new Button("cancelExport").html();
cancelButtonRoot.appendChild(cancelButton);

cancelButton.addEventListener("click", () => {
  window.history.back();
});

cancelButtonRoot.appendChild(cancelButton);
document.body.appendChild(cancelButtonRoot);

const exportButtonRoot = document.createElement("div");
exportButtonRoot.setAttribute("id", "exportButton");
exportButtonRoot.setAttribute("data-tooltip", "Copy & Go to the new URL");
const exportButton = new Button("export").html();
exportButtonRoot.appendChild(exportButton);

exportButton.addEventListener("click", () => {
  navigator.clipboard.writeText(getExportUrl());
  window.location.href = getExportUrl();
});
exportButtonRoot.appendChild(exportButton);
document.body.appendChild(exportButtonRoot);

const getExportUrl = () => {
  const host = "//" + location.host,
    path = location.pathname,
    affix = "?t=",
    data = stringify(t.export());
  return host + path.replace("e.html", "v.html") + affix + data;
};
