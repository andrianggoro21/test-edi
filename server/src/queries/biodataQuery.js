const db = require("../models");
const { Op } = require("sequelize");
const Biodata = db.biodata_calon_karyawan;
const User = db.user;
const Pendidikan = db.pendidikan;
const Riwayat_Pekerjaan = db.riwayat_pekerjaan;
const Riwayat_Pelatihan = db.riwayat_pelatihan;
const Skill = db.skill;
const Orang_Terdekat = db.orang_terdekat;

const getBiodataByIdQuery = async (user_id) => {
  try {
    const res = await Biodata.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "email", "role_id"],
        },
        {
          model: Pendidikan,
        },
        {
          model: Riwayat_Pekerjaan,
        },
        {
          model: Riwayat_Pelatihan,
        },
        {
          model: Skill,
        },
        {
          model: Orang_Terdekat,
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
const createBiodataQuery = async (biodataData) => {
  const t = await db.sequelize.transaction();
  
  try {
    // Create BiodataCalonKaryawan record
    const biodata = await Biodata.create(biodataData.biodata, { transaction: t });

    // Create related records
    if (biodataData.pendidikan) {
      await Pendidikan.bulkCreate(
        biodataData.pendidikan.map(item => ({ ...item, biodata_id: biodata.id })),
        { transaction: t }
      );
    }

    if (biodataData.riwayatPelatihan) {
      await Riwayat_Pelatihan.bulkCreate(
        biodataData.riwayatPelatihan.map(item => ({ ...item, biodata_id: biodata.id })),
        { transaction: t }
      );
    }

    if (biodataData.riwayatPekerjaan) {
      await Riwayat_Pekerjaan.bulkCreate(
        biodataData.riwayatPekerjaan.map(item => ({ ...item, biodata_id: biodata.id })),
        { transaction: t }
      );
    }

    if (biodataData.skill) {
      await Skill.bulkCreate(
        biodataData.skill.map(item => ({ ...item, biodata_id: biodata.id })),
        { transaction: t }
      );
    }

    if (biodataData.orangTerdekat) {
      await Orang_Terdekat.bulkCreate(
        biodataData.orangTerdekat.map(item => ({ ...item, biodata_id: biodata.id })),
        { transaction: t }
      );
    }

    // Commit transaction
    await t.commit();
    return biodata;
  } catch (error) {
    // Rollback transaction in case of error
    await t.rollback();
    throw error;
  }
};


const getBiodataAllQuery = async (searchTerm = '') => {
  try {
    const res = await Biodata.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "role_id"],
        },
        {
          model: Pendidikan,
        },
        {
          model: Riwayat_Pekerjaan,
        },
        {
          model: Riwayat_Pelatihan,
        },
        {
          model: Skill,
        },
        {
          model: Orang_Terdekat,
        },
      ],
      where: {
        nama: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
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
