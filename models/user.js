const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email address must be valid"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
        {
            hooks: {
                beforeValidate: (user, options) => {
                    var salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Todo, { foreignKey: 'userId' });
    };

    return User;
};