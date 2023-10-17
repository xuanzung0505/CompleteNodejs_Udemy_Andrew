const { MongoClient, ObjectId } = require("mongodb");

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

run().catch((err) => {
  console.log(err);
});
