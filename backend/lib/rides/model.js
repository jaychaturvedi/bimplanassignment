"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const model_1 = __importDefault(require("../feedback/model"));
let Ride = db_1.default.define('rides', {
    rideId: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    uid: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    frameId: {
        type: sequelize_1.default.STRING,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
            model: 'bikes',
            key: 'frameId',
        }
    },
    startTime: {
        type: sequelize_1.default.STRING
    },
    endTime: {
        type: sequelize_1.default.STRING
    },
    distance: {
        type: sequelize_1.default.INTEGER
    },
    duration: {
        type: sequelize_1.default.STRING
    },
    averageSpeed: {
        type: sequelize_1.default.INTEGER
    },
    maxSpeed: {
        type: sequelize_1.default.INTEGER
    },
    greenMiles: {
        type: sequelize_1.default.INTEGER
    },
    petrolSaved: {
        type: sequelize_1.default.INTEGER
    },
    litreSaved: {
        type: sequelize_1.default.INTEGER
    },
    caloriesBurnt: {
        type: sequelize_1.default.INTEGER
    },
    rating: {
        type: sequelize_1.default.INTEGER
    },
    feedbackComment: {
        type: sequelize_1.default.STRING
    }
}, {
    freezeTableName: true
});
Ride.hasOne(model_1.default, {
    foreignKey: 'rideId',
    sourceKey: 'rideId',
});
exports.default = Ride;
