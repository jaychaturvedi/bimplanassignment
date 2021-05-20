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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const service_1 = __importDefault(require("./service"));
const helper_1 = require("../helper");
const motovolt_1 = __importDefault(require("../externalApi/motovolt"));
const controller_1 = require("./controller");
const error_1 = require("../error");
const app = express_1.default.Router();
app.get('/all', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const issue = yield service_1.default.findAll();
    const response = helper_1.createResponse("OK", issue, undefined);
    res.send(response);
})));
//speedometer and other details
app.get('/speedometer/:rideId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('rideId', "rideId be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req for speedometer", req.params);
    const speedometer = yield controller_1.getSpeedometer(req.params.rideId);
    console.log("End Time:", new Date());
    const response = helper_1.createResponse("OK", speedometer, undefined);
    res.json(response);
})));
//update rating and feedbacks of a ride
app.put('/rating/:rideId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('rating', "rating can't be empty").toInt().isLength({ min: 1 }),
    express_validator_1.body('option', "option can't be empty").optional(),
    express_validator_1.body('comment', "comment can't be empty").optional(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req for rating", req.params, req.body);
    const { rating, option, comment } = req.body;
    const newride = yield controller_1.updateFeedback(req.params.rideId, rating, option, comment);
    console.log("End Time:", new Date());
    const response = helper_1.createResponse("OK", newride, undefined);
    res.json(response);
})));
//get graph data points and other values, this route is not used
app.get('/graphData/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('pageNo', "pageNo can't be empty").optional().toInt(),
    express_validator_1.query('pageSize', "pageSize can't be empty").optional().toInt(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { startTime, endTime, pageNo, pageSize } = req.query;
    const history = yield motovolt_1.default.getRideHistoryStat(req.params.frameId, startTime, endTime, pageNo, pageSize);
    if ((_a = history[0]) === null || _a === void 0 ? void 0 : _a.st)
        throw new error_1.BadRequestError("No data available for the device");
    const response = helper_1.createResponse("OK", history, undefined);
    res.json(response);
})));
//single ride history details
app.get('/detail/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('tripId', "tripId can't be empty").isString(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req for ride detail", req.params, req.query);
    const { startTime, endTime, tripId } = req.query;
    const newride = yield controller_1.rideDetail(req.params.frameId, startTime, endTime, tripId);
    const response = helper_1.createResponse("OK", newride, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//start a new ride with rideId
app.get('/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.query('rideId', "rideId is empty").isString().isLength({ min: 1 }),
    express_validator_1.query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.param('frameId', "frameId is empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { frameId } = req.params;
    const { uid } = res.locals.user;
    // const { ign: ignition, lc: locked, st, fid } = await ConnectmApi.getBikeLiveData(frameId)
    // if (st) throw new BadRequestError("No data available for frameId")
    // let newride = {}
    // if (!locked && ignition) {//if bike is on then only start a ride
    // }
    console.log("Start Time:", new Date(), "req for new ride", req.params, req.query, res.locals.user);
    const newride = yield controller_1.createNewRide(uid, frameId, req.query.rideId, req.query.startTime);
    const response = helper_1.createResponse("OK", newride, undefined); //send locked state and send starttime
    console.log("End Time:", new Date());
    res.json(response);
})));
//ending a ride, update endtime in databasse
app.put('/:rideId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req for end ride", req.params);
    const ride = yield controller_1.endRide(req.params.rideId, req.query.endTime);
    const response = helper_1.createResponse("OK", ride, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
