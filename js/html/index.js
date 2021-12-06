import { stringify } from "../helper/jsurl.js";

const exampleData = await fetch("./js/views/tree/exampleConfig.json").then(
  (response) => response.json()
);

const jsonStringified = stringify(exampleData);

document.location.replace(`./html/e.html?t=${jsonStringified}`);
