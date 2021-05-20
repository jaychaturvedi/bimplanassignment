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
class WebUser {
    static findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const webUser = yield model_1.default.findOne({
                where: Object.assign({}, condition),
            });
            if (!webUser)
                throw new error_1.BadRequestError('Unable to find dashboard ');
            return webUser;
        });
    }
    static createNew(webUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield model_1.default.findOne({ where: { dashboardId: webUser.dashboardId } });
            if (exists)
                throw new error_1.BadRequestError('dashboardId already exists');
            const newDashboard = yield model_1.default.create(webUser);
            if (!newDashboard)
                throw new error_1.BadRequestError("Unable to create new dashboard");
            return newDashboard;
        });
    }
    static updateWhere(condition, webUser) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(condition);
            yield WebUser.findOne(condition);
            const [isUpdated, [result]] = yield model_1.default.update(webUser, {
                where: Object.assign({}, condition),
                returning: true
            });
            if (!isUpdated)
                throw new error_1.BadRequestError("Unable to update dashboard data");
            return result;
        });
    }
    static deleteWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: Object.assign({}, condition)
            });
            if (!deleted)
                throw new error_1.BadRequestError("No data available to delete");
            return "successfully deleted dashboardId";
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const webUser = yield model_1.default.findAll({
                attributes: ['dashboardId', 'dashboardName', 'dashboardImageUrl', 'authorizedGroup']
            });
            return webUser;
        });
    }
}
exports.default = WebUser;
