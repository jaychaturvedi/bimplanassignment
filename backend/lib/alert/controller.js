"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchById = exports.findByDate = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const error_1 = require("../error");
const service_1 = __importDefault(require("./service"));
const Op = sequelize_1.default.Op;
function findByDate(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const condition = { where: { startDate: { [Op.between]: [startDate, endDate] } } };
        const alerts = yield service_1.default.findAll(condition);
        if (!alerts.count)
            throw new error_1.AlertError('No result found within date range');
        return alerts.rows;
    });
}
exports.findByDate = findByDate;
function searchById(id, limit, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const condition = {
            where: {
                [Op.or]: [
                    { batteryId: { [Op.like]: `%${id}%` } },
                    { customerId: { [Op.like]: `%${id}%` } },
                    { vehicleId: { [Op.like]: `%${id}%` } }
                ]
            },
            limit,
            offset: (page - 1) * limit
        };
        const alerts = yield service_1.default.findAll(condition);
        if (!alerts.count)
            throw new error_1.AlertError('No result found within date range');
        return alerts.rows;
    });
}
exports.searchById = searchById;
