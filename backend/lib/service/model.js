"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let Issues = db_1.default.define('issues', {
    serviceId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // uid: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'users',
    //     key: 'uid',
    //   }
    // },
    // frameId: {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'bikes',
    //     key: 'frameId',
    //   }
    // },
    status: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    comments: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    openTime: {
        type: sequelize_1.default.DATE,
        allowNull: true
    },
    closeTime: {
        type: sequelize_1.default.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
exports.default = Issues;
