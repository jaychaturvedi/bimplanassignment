"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let Feedback = db_1.default.define('feedbacks', {
    rideId: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'rides',
            key: 'rideId',
        }
    },
    options: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.STRING),
        allowNull: false,
    },
    comments: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});
exports.default = Feedback;
