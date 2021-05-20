"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const model_1 = __importDefault(require("../bike/model"));
let User = db_1.default.define('users', {
    uid: {
        type: sequelize_1.default.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    frameId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    age: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    gender: {
        type: sequelize_1.default.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});
User.hasOne(model_1.default, {
    foreignKey: 'uid',
    sourceKey: 'uid'
});
exports.default = User;
