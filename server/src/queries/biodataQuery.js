const db = require("../models");
const Biodata = db.biodata_calon_karyawan;
const User = db.user;

const getBiodataByIdQuery = async (user_id) => {
  try {
    const res = await Biodata.findOne({
      include: [
        {
          model: User,
          attributes: ["email", "role_id"],
        },
      ],
      where: {
        user_id: user_id,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
const createBiodataQuery = async (biodata) => {
  const t = await db.sequelize.transaction();
  try {
    const res = await Biodata.create(biodata, { transaction: t });
    await t.commit();
    return res;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getBiodataAllQuery = async () => {
  try {
    const res = await Biodata.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "role_id"],
        },
      ],
    });

    return res;
  } catch (error) {
    throw error;
  }
};

const updateBiodataQuery = async (user_id, biodata) => {
  const t = await db.sequelize.transaction();
  try {
    const res = await Biodata.update(biodata, {
      where: { user_id: user_id },
      transaction: t,
    });
    await t.commit();
    return res;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  getBiodataByIdQuery,
  createBiodataQuery,
  getBiodataAllQuery,
  updateBiodataQuery,
};
