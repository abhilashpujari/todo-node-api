module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: DataTypes.STRING,
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }
    );

    Todo.associate = function (models) {
        models.Todo.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
    };

    return Todo;
};