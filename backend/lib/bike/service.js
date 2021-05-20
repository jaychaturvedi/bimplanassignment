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
const model_2 = __importDefault(require("../rides/model"));
class Bike {
    static findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = yield model_1.default.findOne({
                where: Object.assign({}, condition),
            });
            if (!bike)
                throw new error_1.BikeError('No data available for devices');
            return bike;
        });
    }
    static createNew(bike) {
        return __awaiter(this, void 0, void 0, function* () {
            // const exists = await BikeModel.findOne({ where: { frameId: bike.frameId } })
            // console.log('in service create new bike', exists);
            // if (exists) throw new BikeError("frameId already verified")
            // const newBike = await BikeModel.create(bike)
            // if (!newBike) throw new BikeError("Unable to create new")
            // return newBike;
            const exists = yield model_1.default.findOne({ where: { frameId: bike.frameId } });
            const newBike = exists ? exists : yield model_1.default.create(bike);
            if (!newBike)
                throw new error_1.BikeError("Unable to create new");
            return newBike;
        });
    }
    static updateWhere(condition, bike) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(condition);
            yield Bike.findOne(condition);
            const [isUpdated, [result]] = yield model_1.default.update(bike, {
                where: Object.assign({}, condition),
                returning: true
            });
            if (!isUpdated)
                throw new error_1.BikeError("Unable to update with id ");
            return result;
        });
    }
    static deleteWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: Object.assign({}, condition)
            });
            if (!deleted)
                throw new error_1.BikeError("Unable to delete with id " + condition);
            return deleted;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const bikes = yield model_1.default.findAll({
                attributes: ['frameId', 'uid'],
                include: [{ model: model_2.default, attributes: ['rideId'] }]
            });
            return bikes;
        });
    }
    static pagination(paginate, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.default.findAndCountAll(Object.assign(Object.assign({}, paginate), { where: Object.assign({}, condition) }));
            if (!users)
                throw new error_1.BikeError("Unable to find and count");
            return users;
        });
    }
}
exports.default = Bike;
