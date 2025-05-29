import { DataTypes } from "sequelize"
import { sequelize } from "../lib/db.js"

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    },
    parentid: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'student',
    timestamps: false
})

export {
    Student
}
