#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");

const options = yargs.usage("Usage: -c command").option("c", {
  alias: "command",
  describe: "Your command",
  type: "string",
  demandOption: true
}).argv;

// Display Usage
function usage() {
  console.log("\nUsage:\ntodos [list|add|delete|help] [optional]\n");
  console.log("todos -c list \t\t\t To list items");
  console.log('todos -c add "Text here" \t To add new item');
  console.log("todos -c delete id \t\t To delete item");
  console.log("todos -c help \t\t\t For help\n");
}

switch (options.c) {
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
