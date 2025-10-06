module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define('Exercise', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        category: {
            type: DataTypes.STRING // E.g. 'Chest', 'Legs', 'Cardio' 
        },
        videoUrl: {
            type: DataTypes.STRING // Link to demonstration video
        }
    });
    return Exercise;
};