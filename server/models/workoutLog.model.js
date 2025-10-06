module.exports = (sequelize, DataTypes) => {
    const WorkoutLog = sequelize.define('WorkoutLog', {
        sets: {
            type: DataTypes.INTEGER
        },
        reps: {
            type: DataTypes.INTEGER
        },
        weight : {
            type: DataTypes.DECIMAL(10, 2) // 100.00 kg/lbs
        },
        durationInSeconds: {
            type: DataTypes.INTEGER // For timed exercises like planks or running
        }
        //WorkoutId and exerciseId will be added by the associations 
    });
    return WorkoutLog;
}