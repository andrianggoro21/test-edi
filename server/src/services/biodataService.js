const {
  createBiodataQuery,
  getBiodataByIdQuery,
  getBiodataAllQuery,
  updateBiodataQuery,
} = require("../queries/biodataQuery");
const { getUserQuery } = require("../queries/userQuery");

const createBiodataService = async (user_id, biodata) => {
  try {
    const checkBiodata = await getBiodataByIdQuery(user_id);
    if (checkBiodata) {
      throw new Error("biodata already exist");
    }
    const res = await createBiodataQuery(biodata);
    return res;
  } catch (error) {
    throw error;
  }
};

const getBiodataService = async (user_id) => {
  try {
    const user = await getUserQuery({ id: user_id });
    if (!user) {
      throw new Error("user not found");
    }
    if (user.role_id === 2) {
      const res = await getBiodataByIdQuery(user.id);
      return res;
    } else if (user.role_id === 1) {
      const res = await getBiodataAllQuery();
      return res;
    } else {
      throw new Error("Invalid role");
    }
  } catch (error) {
    throw error;
  }
};

const updateBiodataService = async (user_id, biodata) => {
  try {
    const checkBiodata = await getBiodataByIdQuery(user_id);
    if (!checkBiodata) {
      throw new Error("biodata not found");
    }
    const res = await updateBiodataQuery(user_id, biodata);
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBiodataService,
  getBiodataService,
  updateBiodataService,
};
