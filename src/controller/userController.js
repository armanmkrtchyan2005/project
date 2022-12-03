import { User } from "../db/model/userModel.js";
import bcrypt from "bcrypt";

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const minPassword = 8;

class UserController {
  async createUser(req, res) {
    const { name, surname, dob, email, password } = req.body;
    const errors = {};

    if (!name.trim()) {
      errors.name = "Please enter your name";
    }

    if (!surname.trim()) {
      errors.surname = "Please enter your surname";
    }

    if (!email.trim() || !email.match(validRegex)) {
      errors.email = "Please enter valid email";
    }

    if (!password) {
      errors.password = "Please enter your password";
    }

    if (password.length < minPassword) {
      errors.password = "Minimum password length in 8";
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors: errors });
    }

    let user = await User.find({
      email,
    });

    if (user) {
      return res.status(400).json({
        error: {
          email: "The email has already been taken",
        },
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    user = new User({
      name,
      email,
      surname,
      dob: new Date(dob),
      password: hashPassword,
    });

    await user.save();

    res.status(201).json(user);
  }

  async getUser(req, res) {
    res.send("get user");
  }

  async getUsers(req, res) {
    const users = await User.find();

    res.status(200).json(users);
  }
}

export default new UserController();
