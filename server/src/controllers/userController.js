const {
  registerUserService,
  getAllUserService,
  loginUserService,
  keepLoginService,
} = require("../services/userService");

const registerUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await registerUserService(email, password, (role_id = 2));
    return res.status(201).json({
      message: "user created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUserService();
    return res.status(200).json({
      message: "get all user successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    return res.status(200).json({
      message: "login successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const keepLoginController = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await keepLoginService(id);
    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUserController,
  getAllUserController,
  loginUserController,
  keepLoginController,
};
