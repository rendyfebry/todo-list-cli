#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const PouchDB = require("pouchdb-node");

const DB_NAME = "todos";
const db = new PouchDB(DB_NAME);

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
  }).argv;

// Display Usage
function usage() {
  console.log("\nUsage:\ntodos -c [add|list|delete|help] -t [optional]\n");
  console.log("todos -c list \t\t\t To list items");
  console.log('todos -c add -t "Text here" \t To add new item');
  console.log("todos -c delete id \t\t To delete item");
  console.log("todos -c help \t\t\t For help\n");
}

function createId() {
  let id = new Date().getTime().toString(16);
  while (id.length < 32) {
    id += Math.random()
      .toString(16)
      .split(".")
      .pop();
  }
  id = id.substr(0, 32);
  id = id.replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, "$1-$2-$3-$4-$5");
  return id;
}

function listItems() {
  console.log("\nTask list");
  console.log("==========================");

  db.allDocs({ include_docs: true })
    .then(result => {
      const { rows } = result;
      if (!rows || !rows.length) {
        console.log("Empty!");
        console.log("==========================\n");
      } else {
        rows.forEach(r => {
          if (r.doc) {
            console.log(
              `[${r.doc.done ? "x" : " "}] ${r.doc._id} - ${r.doc.text}`
            );
          }
        });
        console.log("==========================\n");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function addItem() {
  if (!options.t) {
    console.log(chalk.red.bold("Text is required!"));
    return;
  }

  const newTask = {
    _id: createId(),
    text: options.t,
    done: false
  };
  db.put(newTask).catch(err => {
    console.log(err);
  });

  console.log("New task added!\n");
  console.log("  ID:", newTask._id);
  console.log("  Text:", newTask.text, "\n");
}

function deleteItem() {
  console.log("Delete");
}

switch (options.c) {
  case "list":
    listItems();
    break;
  case "add":
    addItem();
    break;
  case "delete":
    deleteItem();
    break;
  case "help":
    usage();
    break;
  default:
    console.log(chalk.red.bold("Command not found!"));
    usage();
}
