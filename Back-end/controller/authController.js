const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Assuming you have a User model
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../Helper/authHelper");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

// LOGIN FUNCTIONS
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validations
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // check users
    const user = await User.findOne({ email }); // Changed 'User' to 'user'
    //  existing User
    if (!user) {
      return res.status(200).json({ message: "Email is not registered !" });
    }
    //check password
    const isMatch = await comparePassword(password, user.password); // Changed 'User' to 'user'
    if (!isMatch) {
      return res.status(200).json({ message: "Wrong Password !" });
    }
    //create token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        token: user.token,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in Login", error });
  }
};

//TEST CONTROLER
const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//FORGOT PASSWORD CONTROLLER
const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    if (!email) {
      res.status(401).json({ message: "Email is required" });
    }
    if (!question) {
      res.status(401).json({ message: "Question is required" });
    }
    if (!newPassword) {
      res.status(401).json({ message: "New passwords is required" });
    }
    // Check
    const user = await userModel.findOne({ email, answer });
    //validations
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong email or password" });
    }
    const hashed = await user.hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({ success: true, message: "User has been updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

// GET ALL USERS CONTROLLER
const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching users", error });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUsersController,
};
