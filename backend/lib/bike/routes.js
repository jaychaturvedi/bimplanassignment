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
const helper_1 = require("../helper");
const service_1 = __importDefault(require("./service"));
const motovolt_1 = __importDefault(require("../externalApi/motovolt"));
const controller_1 = require("./controller");
const app = express_1.default.Router();
//to be removed, just for testing
app.get('/all', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield service_1.default.findAll();
    const response = helper_1.createResponse("OK", bikes, undefined);
    res.json(response);
})));
//get bike details
app.get('/myBike/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId is required").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request body", req.params);
    console.log("req params in mybike", req.params);
    const bikedetails = yield controller_1.getMyBike(req.params.frameId);
    const response = helper_1.createResponse("OK", bikedetails, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//register frameid to user
app.get('/verify/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId is required").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    console.log("Start Time:", new Date(), "request", req.params, user);
    const bikedetails = yield controller_1.verifyFrame(user, req.params.frameId);
    const response = helper_1.createResponse("OK", bikedetails, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//bikes live location
app.get('/liveLocation/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId is required").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request  for live location", req.params);
    const { lat: latitude, long: longitude, addr: address, utc: lastused } = yield motovolt_1.default.getLiveLocation(req.params.frameId);
    const response = helper_1.createResponse("OK", {
        latitude, longitude, address, lastused
    }, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//ride history and graph data
app.get('/history/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('pageNo', "pageNo can't be empty").optional().toInt(),
    express_validator_1.query('pageSize', "pageSize can't be empty").optional().toInt(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req in history", req.query, req.params);
    const { startTime, endTime, pageNo, pageSize } = req.query;
    const history = yield controller_1.getRideHistory(req.params.frameId, startTime, endTime, pageNo, pageSize);
    const response = helper_1.createResponse("OK", history, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//whether to check if notificatin is true or false
app.get('/notification/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.query('pageNo', "pageNo can't be empty").optional().toInt(),
    express_validator_1.query('pageSize', "pageSize can't be empty").optional().toInt(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNo, pageSize } = req.query;
    console.log("Start Time:", new Date(), "req in notification", req.query, req.params);
    const notification = yield motovolt_1.default.getNotification(req.params.frameId, pageNo, pageSize);
    console.log("End Time:", new Date());
    // if (!notification?.length || notification[0]?.st) return []
    const response = helper_1.createResponse("OK", notification, undefined);
    res.json(response);
})));
//home screen
app.get('/:frameId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "req for home", req.params);
    const frameId = req.params.frameId;
    const body = yield controller_1.homeScreen(frameId);
    const response = helper_1.createResponse("OK", body, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//update bikeName during registration
app.put('/', helper_1.expressQAsync(helper_1.secure), [express_validator_1.body('bikeName', "bikeName is too short").optional().isString().isLength({ min: 1 }),
    express_validator_1.body('frameId', "frameId can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeName, frameId } = req.body;
    console.log("Start Time:", new Date(), "req for update bike", req.body);
    const { uid } = yield service_1.default.updateWhere({ frameId }, { bikeName });
    const response = helper_1.createResponse("OK", { uid, frameId, bikeName }, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.delete('/', helper_1.expressQAsync(helper_1.secure), helper_1.expressQAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield service_1.default.deleteWhere({ uid: res.locals.user.uid });
    const response = helper_1.createResponse("OK", "deleted", undefined);
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
