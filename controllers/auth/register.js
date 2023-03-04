const {requestError} = require("../../helpers");
const { User } = require("../../models/user")
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "E-mail is already in use");
  } else {
    const payload = {
      email,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
      

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      token,
    });
    res.status(201).json({
      code: 201,
      status: "success",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        token: newUser.token,
      },
    });
  }
};

module.exports = register;