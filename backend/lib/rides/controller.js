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
exports.updateFeedback = exports.rideDetail = exports.endRide = exports.createNewRide = exports.getSpeedometer = void 0;
const motovolt_1 = __importDefault(require("../externalApi/motovolt"));
const service_1 = __importDefault(require("./service"));
const error_1 = require("../error");
const controller_1 = require("../feedback/controller");
function getSpeedometer(rideId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { frameId } = yield service_1.default.findOneWhere({ rideId }); //pass frameId directly here
        const { batchrgper: batteryChargePer, rngcrv: rangeCovered, rngavail: rangeAvailable, dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed, maxspd: maxSpeed, mode, pa: pedalAssit, pm: powerMode, ec: ecoMode, ign: ignition, st } = yield motovolt_1.default.getCurrentRide(frameId);
        if (st)
            throw new error_1.RideError("No data available for the rideId or device");
        const body = {
            frameId, batteryChargePer, rangeCovered, rangeAvailable, distance, averageSpeed,
            speed, maxSpeed, timeElapsed, mode, pedalAssit, powerMode, ecoMode, ignition
        };
        return body;
    });
}
exports.getSpeedometer = getSpeedometer;
function createNewRide(uid, frameId, rideId, startTime) {
    return __awaiter(this, void 0, void 0, function* () {
        // const startTime = "2020-09-25 00:00:00"// Date.now() as any
        yield service_1.default.createNew({ uid, frameId, rideId, startTime });
        return { rideId, frameId, uid, startTime };
    });
}
exports.createNewRide = createNewRide;
function endRide(rideId, endTime) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        // const endTime = "2020-09-25 23:59:59" //Date.now() as any
        const { frameId, startTime } = yield service_1.default.findOneWhere({ rideId });
        const ride = yield Promise.all([
            motovolt_1.default.getEndRideStat(frameId, startTime, endTime),
            motovolt_1.default.getEndRideGps(frameId, startTime, endTime),
            service_1.default.updateWhere({ rideId }, { endTime })
        ]);
        console.log(ride);
        if (((_a = ride[0]) === null || _a === void 0 ? void 0 : _a.st) === "false")
            throw new error_1.RideError("no end ride stats available for the frameId");
        // if (!ride[1]?.length || ride[1][0]?.st === "false") throw new RideError("no gps path available for the frameId");
        const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed, grmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved, ptrlt: litreSaved } = ride[0];
        const gpsPath = (!((_b = ride[1]) === null || _b === void 0 ? void 0 : _b.length) || ((_c = ride[1][0]) === null || _c === void 0 ? void 0 : _c.st) === "false") ? [] : ride[1];
        // const { endTime: time } = ride[2] as any
        return {
            frameId, rideId, distance, duration, averageSpeed,
            maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, gpsPath
        };
    });
}
exports.endRide = endRide;
function rideDetail(frameId, startTime, endTime, tripId) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const ride = yield Promise.all([
            motovolt_1.default.histEndRideStat(frameId, tripId),
            motovolt_1.default.getEndRideGps(frameId, startTime, endTime)
        ]);
        // Ride.findOneWhere({ frameId, startTime, endTime })])
        if (((_a = ride[0]) === null || _a === void 0 ? void 0 : _a.st) === "false")
            throw new error_1.RideError("No ride stats available for the frameId");
        // if (!ride[1]?.length || ride[1][0]?.st === "false") throw new RideError("No gps path available for the frameId");
        const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed, grmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved, ptrlt: litreSaved, rating } = ride[0];
        const gpsPath = (!((_b = ride[1]) === null || _b === void 0 ? void 0 : _b.length) || ((_c = ride[1][0]) === null || _c === void 0 ? void 0 : _c.st) === "false") ? [] : ride[1];
        // const { rating } = ride[2]
        return {
            frameId, distance, duration, averageSpeed,
            maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, tripId, rating, gpsPath,
        };
    });
}
exports.rideDetail = rideDetail;
function updateFeedback(rideId, rating, options, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Promise.all([controller_1.createFeedback(rideId, options, comment), service_1.default.updateWhere({ rideId }, { rating })]);
        const feedback = result[0];
        const updated = result[1];
        if (!updated)
            throw new error_1.RideError("Couldn't update rating");
        return { rideId, rating, feedback };
    });
}
exports.updateFeedback = updateFeedback;
