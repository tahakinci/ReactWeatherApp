const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  email: String,
  passwordHash: String,
  cities: [
    {
      name: String,
      mainTemp: Number,
      maxTemp: Number,
      minTemp: Number,
      description: String,
      timezone: Number,
      isLocation: Boolean,
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
