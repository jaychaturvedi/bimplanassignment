"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
let Upgrades = db_1.default.define('features', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
    name: {
        type: sequelize_1.default.STRING,
    },
    icon: {
        type: sequelize_1.default.STRING,
    },
    price: {
        type: sequelize_1.default.INTEGER,
    }
}, {
    freezeTableName: true,
});
// Upgrades.sync({force:true}).then(()=>{console.log("success");
// }).catch((e)=>{
//   console.log(e);
// })
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
exports.default = Upgrades;
