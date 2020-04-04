#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");
const PouchDB = require("pouchdb-node");

const DATA_PATH = "./data.json";
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
  console.log("\nUsage:\ntodos -c [init|list|add|delete|help] -t [optional]\n");
  console.log("todos -c init \t\t\t To initialize storage");
  console.log("todos -c list \t\t\t To list items");
  console.log('todos -c add -t "Text here" \t To add new item');
  console.log("todos -c delete id \t\t To delete item");
  console.log("todos -c help \t\t\t For help\n");
}

function saveData(data) {
  const dataString = JSON.stringify(data);
  fs.writeFileSync(DATA_PATH, dataString);
}

function readData() {
  const res = fs.readFileSync(DATA_PATH);
  const data = JSON.parse(res);

  return data;
}

function init() {
  if (!fs.existsSync(DATA_PATH)) {
    console.log("Initialising storage.");
    saveData([]);
    console.log("Storage created.");
  } else {
    console.log("Storage already initialized!");
  }
}

function listItems() {
  console.log("\nTask list");
  console.log("==========================");

  db.allDocs({ include_docs: true })
    .then(result => {
      const { rows } = result;
      if (!rows || !rows.length) {
        console.log("Empty!");
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
    _id: Date.now().toString(),
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
  case "init":
    init();
    break;
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
