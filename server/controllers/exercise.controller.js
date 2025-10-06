const db = require("../models");
const Exercise = db.exercise;

// Create a new exercise (can be admin-only)
exports.create = async (req, res) => {
  try {
    const exercise = await Exercise.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      videoUrl: req.body.videoUrl
    });
    res.status(201).send(exercise);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all exercises from the database.
exports.findAll = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};