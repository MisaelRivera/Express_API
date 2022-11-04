const sequelize = require('./conn');
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
{
    sequelize,
    tableName: 'users',
    modelName: 'User',
});

module.exports = User;