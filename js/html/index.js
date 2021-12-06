import { stringify } from "../helper/jsurl.js";

const exampleData = await fetch("./js/views/tree/exampleConfig.json").then(
  (response) => response.json()
);

const jsonStringified = stringify(exampleData);

location.href = `./html/e.html?t=${jsonStringified}`;
