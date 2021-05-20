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
class FaqQnA {
    static findWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const upgrade = yield model_1.default.findOne({ where: Object.assign({}, condition) });
            if (!upgrade)
                throw new error_1.SupportError('Error while finding id');
            return upgrade;
        });
    }
    static createNew(upgrade) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUpgrade;
            // try{
            newUpgrade = yield model_1.default.create(upgrade);
            // } catch(e){
            //   throw new SupportError("You are trying to create duplicate records")
            // }
            if (!newUpgrade)
                throw new error_1.SupportError("Error while creating");
            return newUpgrade;
        });
    }
    static deleteWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({ where: Object.assign({}, condition) });
            if (!deleted)
                throw new error_1.SupportError("Error while deleting id " + condition);
            return deleted;
        });
    }
    static updateWhere(condition, upgrade) {
        return __awaiter(this, void 0, void 0, function* () {
            yield FaqQnA.findWhere(condition);
            const [isUpdated, [result]] = yield model_1.default.update(upgrade, {
                where: Object.assign({}, condition),
                returning: true
            });
            if (!isUpdated)
                throw new error_1.SupportError("Error while updating ");
            return result;
        });
    }
    static findAllWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield model_1.default.findAndCountAll({ where: Object.assign({}, condition) });
            if (!issues)
                throw new error_1.SupportError("Could not receive any data");
            return issues;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield model_1.default.findAll({
                attributes: { exclude: ['updatedAt', 'createdAt'] },
                order: [['id', 'ASC']]
            });
            if (!issues)
                throw new error_1.SupportError("Could not receive any data");
            return issues;
        });
    }
    static paginate(paginate, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield model_1.default.findAndCountAll(Object.assign(Object.assign({}, paginate), { where: Object.assign({}, condition) }));
            if (!issues)
                throw new error_1.SupportError("Unable to find and count");
            return issues;
        });
    }
}
exports.default = FaqQnA;
