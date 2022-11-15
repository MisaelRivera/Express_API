const sequelize = require('./conn');
const { DataTypes, Model } = require('sequelize');
const User = require('./User');

class Goal extends Model {}

Goal.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    /*user_id: {
        type: DataTypes.INTEGER,
        model: User,
        key: 'id',
    }*/
},
{
    sequelize,
    tableName: 'goals',
    modelName: 'Goal',
});

module.exports = Goal;