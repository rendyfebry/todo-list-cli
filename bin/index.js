#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const TodosController = require("./controllers/todos");

// Should move to .env
const DB_NAME = "todos";
const DB_REMOTE_USER = "admin";
const DB_REMOTE_PASSWORD = "iniadmin";
const DB_REMOTE_HOST = "13.250.43.79";

const todos = new TodosController({
  db_name: DB_NAME,
  remote_user: DB_REMOTE_USER,
  remote_password: DB_REMOTE_PASSWORD,
  rmeote_host: DB_REMOTE_HOST
});

const options = yargs
  .usage("Usage: -c command")
  .option("c", {
    alias: "command",
    describe: "Your command",
    type: "string",
    demandOption: true
  })
  .option("t", {
    alias: "text",
    describe: "Text",
    type: "string"
  })
  .option("i", {
    alias: "id",
    describe: "Task ID",
    type: "string"
  }).argv;

function usage() {
  console.log(
    "\nUsage:\ntodos -c [add|list|delete|complete|sync|help] -t [optional] -i [optional]\n"
  );
  console.log("todos -c list \t\t\t To list items");
  console.log('todos -c add -t "Text here" \t To add new item');
  console.log('todos -c delete -i "ID" \t To delete item');
  console.log('todos -c complete -i "ID" \t To mark item complete');
  console.log("todos -c sync \t\t\t To sync DB");
  console.log("todos -c help \t\t\t For help\n");
}

switch (options.c) {
  case "list":
    todos.listItems();
    break;
  case "add":
    if (!options.t) {
      console.log(chalk.red.bold("Text is required!"));
      usage();
      return;
    }

    todos.addItem(options.t);
    break;
  case "delete":
    if (!options.i) {
      console.log(chalk.red.bold("ID is required!"));
      usage();
      return;
    }
    todos.deleteItem(options.i);
    break;
  case "complete":
    if (!options.i) {
      console.log(chalk.red.bold("ID is required!"));
      usage();
      return;
    }
    todos.markItem(options.i);
    break;
  case "sync":
    todos.sync();
    break;
  case "help":
    usage();
    break;
  default:
    console.log(chalk.red.bold("Command not found!"));
    usage();
}
