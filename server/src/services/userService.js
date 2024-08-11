const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  registerUserQuery,
  getUserQuery,
  getRoleByIdQuery,
  getUserAllQuery,
} = require("../queries/userQuery");

const registerUserService = async (email, password, role_id) => {
  try {
    const checkUser = await getUserQuery({email: email});
    if (checkUser) {
      throw new Error("user already exist");
    }

    const checkRole = await getRoleByIdQuery(role_id);
    console.log("check role", checkRole);

    if (!checkRole) {
      throw new Error("role not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    let payload = {
      email: email,
      role_id: role_id,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });

    const res = await registerUserQuery(email, password, role_id);
    return { user: res, token };
  } catch (error) {
    throw error;
  }
};

const getAllUserService = async () => {
  try {
    const res = await getUserAllQuery();
    return res;
  } catch (error) {
    throw error;
  }
};

const loginUserService = async (email, password) => {
  try {
    const checkUser = await getUserQuery({ email: email });
    if (!checkUser) {
      throw new Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      throw new Error("password not match");
    }

    let payload = {
      id: checkUser.id,
      email: checkUser.email,
      role_id: checkUser.role_id,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    
    return { user: checkUser, token };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUserService,
  getAllUserService,
  loginUserService,
};
