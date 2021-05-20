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
exports.paginate = exports.getRideHistory = exports.verifyFrame = exports.homeScreen = exports.getMyBike = void 0;
const error_1 = require("../error");
const motovolt_1 = __importDefault(require("../externalApi/motovolt"));
const service_1 = __importDefault(require("../user/service"));
const sequelize_1 = __importDefault(require("sequelize"));
const service_2 = __importDefault(require("./service"));
const helper_1 = require("../helper");
const Op = sequelize_1.default.Op;
function getMyBike(frameId) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Promise.all([motovolt_1.default.getMyBike(frameId), service_2.default.findOne({ frameId })]);
        const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId, bathltper: batteryHealthPer, vehid: vehicleId, model, type, servDate: serviceDate, warrantyValidTill, purchaseDate } = result[0];
        if (!fid)
            throw new error_1.BikeError("No data available for devices");
        const { bikeName } = result[1];
        const hltStat = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.hltStat) || "";
        const batStat = ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.batStat) || "";
        const mtrStat = ((_c = result[0]) === null || _c === void 0 ? void 0 : _c.mtrStat) || "";
        return {
            bikeName, motorPer, batteryChargePer, batteryHealthPer, model, type,
            batteries: [{ id: batteryId }], vehicleId, serviceDate, warrantyValidTill, purchaseDate,
            hltStat, batStat, mtrStat
        };
    });
}
exports.getMyBike = getMyBike;
function homeScreen(frameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [bikeStat, myBike, bikeLiveData] = yield Promise.all([
            motovolt_1.default.getBikeStat(frameId),
            motovolt_1.default.getMyBike(frameId),
            motovolt_1.default.getBikeLiveData(frameId)
        ]);
        const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved, grnmls: greenMiles, costrcv: costRecovered, ptrlt: petrolInLitre, calbnt: caloriesBurnt } = bikeStat; //get bike status
        const { type } = myBike;
        const { batchrgper: batteryCharge, rngcvr: rangeCovered, rngavail: rangeAvailable, ign: ignition, lc: locked, prom: promotion, noty: notification } = bikeLiveData; //get bike live data
        if (!(bikeLiveData === null || bikeLiveData === void 0 ? void 0 : bikeLiveData.fid) || !(bikeStat === null || bikeStat === void 0 ? void 0 : bikeStat.fid) || !(myBike === null || myBike === void 0 ? void 0 : myBike.fid))
            throw new error_1.BikeError("No data available for frameId");
        return {
            co2sav, totalDistance, ratings, petrolSaved, petrolInLitre, type, greenMiles, costRecovered,
            batteryCharge, rangeCovered, rangeAvailable, ignition, locked, promotion, notification,
            caloriesBurnt
        };
    });
}
exports.homeScreen = homeScreen;
function verifyFrame(user, frameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, phone } = user;
        const [validateFrame, myBikeData] = yield Promise.all([
            motovolt_1.default.validatePhone(phone),
            motovolt_1.default.getMyBike(frameId)
        ]);
        const { fid: associatedFrameId } = validateFrame;
        if (associatedFrameId != frameId) {
            throw new error_1.BikeError("frameId is not registered with phone");
        }
        const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId, bathltper: batteryHealthPer, vehid: vehicleId, model, type, servDate: serviceDate } = myBikeData; //cross verify with mobile number
        if (!fid)
            throw new error_1.BikeError("frameId is not registered");
        //update frameId in new bike and user profile found from ValidatePhone API
        const result = yield Promise.all([
            service_2.default.createNew({ frameId, model, uid }),
            service_1.default.updateByUid(uid, { frameId })
        ]);
        return {
            uid, frameId, model, type, serviceDate, batteryChargePer, batteries: [{ id: batteryId }]
        };
    });
}
exports.verifyFrame = verifyFrame;
function getRideHistory(frameId, startTime, endTime, pageNo, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Promise.all([motovolt_1.default.getRideHistory(frameId, startTime, endTime, pageNo, pageSize),
            motovolt_1.default.getRideHistoryStat(frameId, startTime, endTime, pageNo, pageSize)]);
        const history = result[0];
        const graphData = result[1];
        console.log(graphData);
        // if (!history?.length || !graphData?.length || !history[0]?.fid || !graphData[0]?.fid) 
        //   return { history: [], graphData: [] }
        return { history, graphData };
    });
}
exports.getRideHistory = getRideHistory;
function paginate(pageNumber, pageSize, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let paginate = {};
        if (pageNumber || pageSize) {
            paginate = helper_1.pagination(pageNumber, pageSize);
        }
        const issues = yield service_2.default.pagination(paginate, condition);
        return issues;
    });
}
exports.paginate = paginate;
