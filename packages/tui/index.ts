import { find } from "@fuzzy/core";
import data from "./data/cards.json";
import { createInterface } from "readline";
import { stdin, stdout } from "process";

const input = createInterface(stdin, stdout);

function loop() {
  input.question("... ", (query) => {
    if (!query) input.close();
    console.log(find({ query, data, key: "name", count: 20 }));
    loop();
  });
}

loop();
