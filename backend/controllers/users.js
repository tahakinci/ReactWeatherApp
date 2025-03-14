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

usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cityNames = new Set(user.cities.map((c) => c.name.toLowerCase()));
    if (cityNames.has(city.name.toLowerCase())) {
      return res.status(400).json({ error: `${city.name} is already saved` });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { cities: city } },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cities } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { cities: cities } },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
