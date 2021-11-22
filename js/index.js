import Tree from "./tree/tree.js";

const exampleData = await fetch("js/tree/exampleConfig.json").then((response) =>
  response.json()
);

const t = new Tree(exampleData);
document.body.appendChild(t.html());
