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
class User {
    static findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.default.findOne({ where: { phone } });
            if (!user)
                throw new error_1.UserError(`${phone} not found`);
            return user;
        });
    }
    static findByUid(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.default.findOne({ where: { uid } });
            if (!user)
                throw new error_1.UserError(`${uid} not found `);
            return user;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.default.findAll();
            return users;
        });
    }
    static createNew(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const phone = user.phone;
            const existingUser = yield model_1.default.findOne({ where: { phone } });
            if (existingUser) {
                throw new error_1.UserError("User already exists");
            }
            const newuser = yield model_1.default.create(user);
            if (!newuser)
                throw new error_1.UserError("Unable to create new ");
            return newuser;
        });
    }
    static updateByPhone(phone, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.findByPhone(phone);
            const [isUpdated, [result]] = yield model_1.default.update(user, {
                where: { phone },
                returning: true
            });
            if (!isUpdated)
                throw new error_1.UserError("No data to update");
            return result;
        });
    }
    static updateByUid(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.findByUid(uid);
            const [isUpdated, [result]] = yield model_1.default.update(user, {
                where: { uid },
                returning: true
            });
            if (!isUpdated)
                throw new error_1.UserError("No data to update");
            return result;
        });
    }
    static deleteById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: { uid }
            });
            if (!deleted)
                throw new error_1.UserError("No data to delete");
            return deleted;
        });
    }
    static deleteByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: { phone }
            });
            if (!deleted)
                throw new error_1.UserError("No data to delete");
            return deleted;
        });
    }
    static findAndCountAll(paginate, where) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.default.findAndCountAll(Object.assign(Object.assign({}, paginate), { where }));
            if (!users)
                throw new error_1.BikeError("Unable to find and count");
            return users;
        });
    }
}
exports.default = User;
