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
exports.paginateUser = exports.profile = void 0;
const service_1 = __importDefault(require("./service"));
const helper_1 = require("../helper");
function profile(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield service_1.default.findByUid(uid);
        //since data is redundant
        // const { batid: batteryId, vehid: vehicleId, servDate: serviceDate, purchaseDate, warrantyValidTill } = await ConnectmApi.getMyBike(frameId as string);
        return user;
    });
}
exports.profile = profile;
function paginateUser(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageNumber, pageSize } = filter;
        delete filter.pageNumber;
        delete filter.pageSize;
        let paginate = {};
        if (pageNumber || pageSize) {
            paginate = helper_1.pagination(pageNumber, pageSize);
        }
        const where = helper_1.filters(filter);
        const users = yield service_1.default.findAndCountAll(paginate, where);
        if (!users)
            return 0;
        return users;
    });
}
exports.paginateUser = paginateUser;
