const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-app";

const client = new MongoClient(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(function connect() {
  client.connect((error, client) => {
    if (error) {
      return console.log("Cannot connect");
    }
    console.log("MongoDB Connected");
  });
})();

const db = client.db(dbName);
const user = db.collection("users");

async function run() {
  const result = await user.findOne({
    name: "Doe",
    age: 23,
  });
  console.log(result);
}

run().catch((err) => {
  console.log(err);
});
