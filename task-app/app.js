const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = require("./router");

//setup express
const port = process.env.PORT || 3000;
const app = express();
app.use((req, res, next) => {
  console.log(req.method);
  next();
});

//setup mongo
const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-app";

const client = new MongoClient(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//middleware
app.use(router);

//connect to DB
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
  // const newDoc = await user.insertOne({
  //   name: "Doee",
  //   age: 21,
  // });

  const result = await user.findOne({
    _id: new ObjectId("651fcfcb7ce5cc330cb9eb7b"),
  });
  // console.log(result);

  // const results = await user.find({}).toArray();
  // for (const item of results) {
  //   console.log(item);
  // }

  // const cursor = user.find({});
  // while (await cursor.hasNext()) {
  //   console.log(await cursor.next());
  // }

  const updatePromise = user.updateOne(
    {
      _id: new ObjectId("651fcfcb7ce5cc330cb9eb7b"),
    },
    {
      $set: {
        name: "kasldjfklsdafj",
      },
    }
  );

  updatePromise
    .then((result) => {
      // console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

// run().catch((err) => {
//   console.log(err);
// });

//run APP
app.listen(port, () => {
  console.log("Listening");
});
