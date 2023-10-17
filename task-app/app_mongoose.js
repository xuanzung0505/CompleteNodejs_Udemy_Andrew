const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-app", {
  useNewUrlParser: true,
});

// const objectId = new mongoose.Types.ObjectId();
// console.log(objectId instanceof mongoose.Types.ObjectId);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [
        (value) => {
          const check = validator.isEmail(value);
          if (!check) throw new Error("Throw email not valid");
          return check;
        },
        "{PATH}:{VALUE} not a valid email",
      ],
    },
    nested: {
      type: new mongoose.Schema({
        prop1: {
          type: String,
          // required: true,
        },
        prop2: {
          type: String,
          // required: true,
        },
      }),
      required: true,
    },
  })
);

const user = new User({
  name: "namee",
  age: 27,
  email: "hehe@gmail.com",
  nested: {},
});
// const user = new User({ name: "hehehehe", age: "hehe" });

async function Async() {
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
}

Async();
