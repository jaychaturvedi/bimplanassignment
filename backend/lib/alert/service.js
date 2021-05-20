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
const model_1 = __importDefault(require("./model"));
const error_1 = require("../error");
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
class SmartAlert {
    static findByDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                startDate: {
                    [Op.between]: [startDate, endDate],
                },
            };
            const alerts = yield model_1.default.findAndCountAll({ where });
            if (!alerts)
                throw new error_1.AlertError("Unable to find and count");
            return alerts;
        });
    }
    static findByLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const alerts = yield model_1.default.findAndCountAll({ where: { location } });
            if (!alerts)
                throw new error_1.AlertError("Unable to find and count");
            return alerts;
        });
    }
    static findByModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const alerts = yield model_1.default.findAndCountAll({ where: { model } });
            if (!alerts)
                throw new error_1.AlertError("Unable to find and count");
            return alerts;
        });
    }
    static findAll(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const alerts = yield model_1.default.findAndCountAll(condition);
            if (!alerts)
                throw new error_1.AlertError("Unable to find and count");
            return alerts;
        });
    }
}
exports.default = SmartAlert;
