"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const model_1 = __importDefault(require("../faqQnA/model"));
let Faq = db_1.default.define('faqCategory', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    icon: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    active: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    freezeTableName: true
});
Faq.hasMany(model_1.default, {
    foreignKey: 'faqId',
    sourceKey: 'id',
});
exports.default = Faq;
