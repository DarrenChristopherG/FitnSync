const db = require("../models");
const Workout = db.workout;
const WorkoutLog = db.workoutLog;
const Exercise = db.exercise;

// Log a new workout for the authenticated user
exports.logWorkout = async (req, res) => {
  const { date, notes, logs } = req.body; // logs is an array of { exerciseId, sets, reps, weight, ... }
  const userId = req.userId; // from authJwt middleware

  const t = await db.sequelize.transaction(); // Start a transaction

  try {
    // 1. Create the main Workout entry
    const workout = await Workout.create({ date, notes, UserId: userId }, { transaction: t });

    // 2. Create all the detailed WorkoutLog entries
    const workoutLogs = logs.map(log => ({
      ...log,
      WorkoutId: workout.id
    }));
    await WorkoutLog.bulkCreate(workoutLogs, { transaction: t });
    
    // If all went well, commit the transaction
    await t.commit();
    res.status(201).send({ message: "Workout logged successfully!" });

  } catch (error) {
    // If anything fails, roll back the transaction
    await t.rollback();
    res.status(500).send({ message: error.message || "Failed to log workout." });
  }
};

// Get workout history for the authenticated user
exports.getHistory = async (req, res) => {
  const userId = req.userId;
  try {
    const workouts = await Workout.findAll({
      where: { UserId: userId },
      order: [['date', 'DESC']],
      // Include the related data for a rich response
      include: [{
        model: WorkoutLog,
        as: 'logs',
        include: [{
          model: Exercise
        }]
      }]
    });
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};