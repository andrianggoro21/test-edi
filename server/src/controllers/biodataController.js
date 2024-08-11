const {
  createBiodataService,
  getBiodataService,
  updateBiodataService,
} = require("../services/biodataService");

const createBiodataController = async (req, res) => {
  try {
    const biodata = req.body;
    const result = await createBiodataService(biodata);
    return res.status(201).json({
      message: "biodata created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const getBiodataController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { searchTerm } = req.query;
    const result = await getBiodataService(user_id, searchTerm);
    return res.status(200).json({
      message: "get biodata successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateBiodataController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const biodata = req.body;
    const result = await updateBiodataService(user_id, biodata);
    return res.status(200).json({
      message: "biodata updated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBiodataController,
  getBiodataController,
  updateBiodataController,
};
