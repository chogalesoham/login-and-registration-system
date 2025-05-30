const userModel = require("../Models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RagisterUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    if (!name || !dob || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Filds all Requred",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Email Alredy Exist Plase Login",
      });
    }
    const userData = new userModel({ name, dob, email, password });
    userData.password = await bcrypt.hash(password, 10);
    userData.save();
    res.status(200).json({
      success: true,
      message: "User Ragister Successfull",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found by this email",
      });
    }
    const isPassEqual = await bcrypt.compare(password, user?.password);
    if (!isPassEqual) {
      return res.status(403).json({
        success: false,
        message: "Plase Enter Correct password",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      success: true,
      message: "User Login Successfull",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res
      .status(200)
      .json({ success: true, message: "All User", data: allUsers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { RagisterUser, LoginUser, GetAllUsers };
