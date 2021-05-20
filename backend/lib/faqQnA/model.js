"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let FaqQnA = db_1.default.define('faq', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        unique: true,
    },
    Question: {
        type: sequelize_1.default.STRING(1000)
    },
    Answer: {
        type: sequelize_1.default.STRING(1500)
    },
    faqId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
            model: 'faqCategory',
            key: 'id',
        }
    },
}, {
    freezeTableName: true
});
exports.default = FaqQnA;
