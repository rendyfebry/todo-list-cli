#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");

const DATA_PATH = "./data.json";

const options = yargs.usage("Usage: -c command").option("c", {
  alias: "command",
  describe: "Your command",
  type: "string",
  demandOption: true
}).argv;

// Display Usage
function usage() {
  console.log("\nUsage:\ntodos [init|list|add|delete|help] [optional]\n");
  console.log("todos -c init \t\t\t To initialize storage");
  console.log("todos -c list \t\t\t To list items");
  console.log('todos -c add "Text here" \t To add new item');
  console.log("todos -c delete id \t\t To delete item");
  console.log("todos -c help \t\t\t For help\n");
}

function saveData(data) {
  // stringify data
  const dataString = JSON.stringify(data);

  // Write file
  fs.writeFileSync(DATA_PATH, dataString);
}

function init() {
  if (!fs.existsSync(DATA_PATH)) {
    console.log("Initialising storage.");
    saveData([]);
    console.log("Storage created.");
  } else {
    console.log("Already initialized");
  }
}

switch (options.c) {
  case "init":
    init();
    break;
  case "list":
    console.log("list");
    break;
  case "add":
    console.log("add");
    break;
  case "delete":
    console.log("delete");
    break;
  case "help":
    usage();
    break;
  default:
    console.log(chalk.red.bold("Command not found!"));
    usage();
}
