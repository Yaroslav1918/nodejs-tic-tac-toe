const { User, schemas } = require("../../models/user");
const {createError} = require("../../helpers/createError");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw createError(401, "Email not verify");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
    },
  });
};

module.exports = login;
