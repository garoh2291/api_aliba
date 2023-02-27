const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const errorConfig = require("../utils/error.config");
const { generateAccessToken } = require("../utils/helpers");

const hash = process.env.HASH_LENGTH;

class UserController {
  signUp = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Registration error",
          error: errors.errors[0].msg,
        });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(401).json(errorConfig.userExists);
      }

      const hashPassword = await bcrypt.hash(password, +hash);

      const user = new User({
        username,
        password: hashPassword,
      });

      await user.save();
      res.status(201).send("User Succesfully registrated");
    } catch (e) {
      return res.status(404).json(e);
    }
  };

  signin = async (req, res) => {
    try {
      const { username, password } = req.body;

      const candidate = await User.findOne({ username });

      if (!candidate) {
        return res.status(404).json(errorConfig.userNotFound);
      }

      const validPassword = bcrypt.compareSync(password, candidate.password);

      if (!validPassword) {
        return res.status(404).json(errorConfig.wrongPasswordError);
      }

      const token = generateAccessToken(candidate._id);

      res.json({ token, user: candidate._id });
    } catch (e) {
      return res.status(404).json(e);
    }
  };
}

module.exports = new UserController();
