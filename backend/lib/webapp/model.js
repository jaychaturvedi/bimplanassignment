"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let Dashboard = db_1.default.define('dashboard', {
    dashboardId: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    dashboardName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    dashboardImageUrl: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    authorizedGroup: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.STRING),
        allowNull: false,
    }
}, {
    freezeTableName: true
});
exports.default = Dashboard;
