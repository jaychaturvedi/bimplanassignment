"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const model_1 = __importDefault(require("../rides/model"));
const model_2 = __importDefault(require("../service/model"));
let Bike = db_1.default.define('bikes', {
    frameId: {
        type: sequelize_1.default.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    uid: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'users',
            key: 'uid',
        }
    },
    bikeName: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    warrantyId: {
        type: sequelize_1.default.STRING
    },
    batteryId: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.STRING)
    },
    model: {
        type: sequelize_1.default.STRING
    },
    batteryPer: {
        type: sequelize_1.default.STRING
    },
    rangeCovered: {
        type: sequelize_1.default.STRING
    },
    rangeAvailable: {
        type: sequelize_1.default.STRING
    },
    ignitionStatus: {
        type: sequelize_1.default.BOOLEAN
    },
    isLocked: {
        type: sequelize_1.default.BOOLEAN
    },
    purchaseDate: {
        type: sequelize_1.default.DATE
    },
    serviceDate: {
        type: sequelize_1.default.DATE
    },
}, { freezeTableName: true });
Bike.hasMany(model_1.default, {
    foreignKey: 'frameId',
    sourceKey: 'frameId',
});
Bike.hasMany(model_2.default, {
    foreignKey: 'frameId',
    sourceKey: 'frameId',
});
exports.default = Bike;
