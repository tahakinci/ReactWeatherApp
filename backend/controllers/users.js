const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

usersRouter.post("/", async (req, res, next) => {
  const { name, surname, username, email, password } = req.body;
  try {
    if (password.length < 3) {
      return res
        .statusMessage(401)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      surname,
      username,
      email,
      passwordHash,
    });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = {
      name: body.name,
      surname: body.surname,
      username: body.username,
      email: body.email,
      passwordHash: body.passwordHash,
      cities: body.cities,
    };

    console.log("updated user: ", updatedUser);

    await User.findByIdAndUpdate(id, updatedUser);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
