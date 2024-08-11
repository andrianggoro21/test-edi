const db = require("../models");
const User = db.user;
const Role = db.role;
const Biodata = db.biodata_calon_karyawan;

const getUserQuery = async (identifier) => {
  try {
    const whereClause = {};

    if (identifier.email) {
      whereClause.email = identifier.email;
    }

    if (identifier.id) {
      whereClause.id = identifier.id;
    }

    const res = await User.findOne({
      where: whereClause,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const getRoleByIdQuery = async (role_id) => {
  try {
    console.log(role_id);
    const res = await Role.findOne({
      where: {
        id: role_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
const registerUserQuery = async (email, password, role_id) => {
  const t = await db.sequelize.transaction();
  try {
    const res = await User.create(
      {
        email: email,
        password: password,
        role_id: role_id,
      },
      { transaction: t }
    );
    await t.commit();
    return res;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getUserAllQuery = async () => {
  try {
    const res = await User.findAll({
      include: [
        {
          model: Biodata,
        },
      ],
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserQuery,
  getRoleByIdQuery,
  registerUserQuery,
  getUserAllQuery,
};
