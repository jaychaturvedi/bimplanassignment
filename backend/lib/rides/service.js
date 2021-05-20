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
const model_2 = __importDefault(require("../feedback/model"));
class Ride {
    static findOneWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const ride = yield model_1.default.findOne({ where: Object.assign({}, condition) });
            if (!ride)
                throw new error_1.RideError('Unable to find the ride ');
            return ride;
        });
    }
    static createNew(ride) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield model_1.default.findOne({ where: { rideId: ride.rideId } });
            if (exists)
                throw new error_1.RideError('rideId already exists');
            const newride = yield model_1.default.create(ride);
            if (!newride)
                throw new error_1.RideError("Ride was not created maybe it already exists");
            return newride;
        });
    }
    static updateWhere(condition, ride) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Ride.findOneWhere(condition);
            const [isUpdated, [result]] = yield model_1.default.update(ride, {
                where: Object.assign({}, condition),
                returning: true
            });
            if (!isUpdated)
                throw new error_1.RideError("Unable to update with rideId ");
            return result;
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: { id }
            });
            if (!deleted)
                throw new error_1.RideError("Unable to delete with id " + id);
            return deleted;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield model_1.default.findAndCountAll({ include: [{ model: model_2.default }] });
            if (!rides)
                throw new error_1.RideError("Unable to find and count");
            return rides;
        });
    }
}
exports.default = Ride;
