"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let SmartAlert = db_1.default.define('alerts', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alertType: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    vehicleId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    customerId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    batteryId: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    alertName: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    alertTime: {
        type: sequelize_1.default.DATEONLY,
        allowNull: true
    },
    model: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    subModel: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    openSince: {
        type: sequelize_1.default.DATE,
        allowNull: true
    },
    closedDate: {
        type: sequelize_1.default.DATE,
        allowNull: true
    },
    severity: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    mfgDate: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    location: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    zone: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    totalDistnce: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    utilization: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    ridePerMonth: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    averageRangePerRide: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    averageMilegae: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true
});
exports.default = SmartAlert;
