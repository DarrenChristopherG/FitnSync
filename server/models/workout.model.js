module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('Workout', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT
        }
    });
    return Workout;
}