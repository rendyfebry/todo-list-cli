const PouchDB = require("pouchdb-node");

class Todos {
  constructor({ db_name, remote_user, remote_password, rmeote_host }) {
    this.db_name = db_name;
    this.remote_user = remote_user;
    this.remote_password = remote_password;
    this.rmeote_host = rmeote_host;

    this.db = new PouchDB(db_name);
  }

  createId() {
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

  addItem(text) {
    console.log("\nAdd Task");
    console.log("==========================");

    const newTask = {
      _id: this.createId(),
      text,
      done: false
    };

    this.db
      .put(newTask)
      .then(() => {
        console.log("New task added! \n");
        console.log(JSON.stringify(newTask));
      })
      .catch(err => {
        console.log(`Add Item Failed! ${err.name || ""} \n`);
      });
  }

  deleteItem(id) {
    console.log("\nDelete Item");
    console.log("==========================");

    this.db
      .get(id)
      .then(doc => this.db.remove(doc._id, doc._rev))
      .then(result => {
        console.log("Sucessfully delete Item!\n");
      })
      .catch(err => {
        console.log(`Delete Failed! ${err.name || ""} \n`);
      });
  }

  markItem(id) {
    console.log("\nMark Item");
    console.log("==========================");

    this.db
      .get(id)
      .then(doc => {
        return this.db.put({
          _id: doc._id,
          _rev: doc._rev,
          text: doc.text,
          done: true
        });
      })
      .then(result => {
        console.log("Sucessfully mark Item!\n");
      })
      .catch(err => {
        console.log(`Mark Failed! ${err.name || ""} \n`);
      });
  }

  listItems() {
    console.log("\nTask list");
    console.log("==========================");

    this.db
      .allDocs({ include_docs: true })
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
        console.log(`List item Failed! ${err.name || ""} \n`);
      });
  }

  sync() {
    console.log("\nSync DB");
    console.log("==========================");

    const dbConn = `http://${this.remote_user}:${this.remote_password}@${this.rmeote_host}:5984/${this.db_name}_rendyfebry`;

    PouchDB.sync(this.db_name, dbConn)
      .on("change", () => {
        console.log("Synchronizing...");
      })
      .on("complete", err => {
        console.log("Sync completed!\n");
      })
      .on("error", err => {
        console.log(`Sync Failed! ${err.name || ""} \n`);
      });
  }
}

module.exports = Todos;
