"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.expressQAsync = void 0;
const Express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const helper_1 = require("../helper");
const webapp_1 = __importDefault(require("../externalApi/webapp"));
const lambdaService_1 = require("./lambdaService");
const error_1 = require("../error");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const getQuickSightUrl_1 = require("./getQuickSightUrl");
const service_1 = __importDefault(require("./service"));
const app = Express.Router();
function validate(req, res, next) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error(errors.array({ onlyFirstError: true })[0].msg);
    }
    next();
}
function expressQAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.expressQAsync = expressQAsync;
function webSecure(req, res, next) {
    const token = req.headers.authorization;
    if (!token)
        throw new error_1.BadRequestError("No token in header");
    const { email } = jwt_decode_1.default(token);
    res.locals.user = { email, idToken: token };
    console.log(res.locals.user);
    next();
}
function expressErrorHandler(err, req, res, next) {
    const response = helper_1.createResponse("ERROR", undefined, {
        code: err.errorCode,
        name: err.name,
        message: err.message
    });
    res.status(200);
    return res.json(response);
}
//dashboard main alerts
app.post('/mainAlerts', [express_validator_1.body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    express_validator_1.body("pageNo", "pageNo is invalid").toInt(),
    express_validator_1.body("pageSize", "pageSize is invalid").toInt(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { alertType, pageNo, pageSize } = req.body;
    console.log("Start zelp API", new Date());
    const updated = yield webapp_1.default.mainAlerts(alertType, pageNo, pageSize);
    const response = helper_1.createResponse("OK", updated, undefined);
    console.log("End zelp API", new Date());
    res.json(response);
})));
//
app.post('/totalAlerts', [express_validator_1.body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    express_validator_1.body("startDate", "startDate is invalid").isString(),
    express_validator_1.body("endDate", "endDate is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { alertType, startDate, endDate } = req.body;
    const totalAlerts = yield webapp_1.default.totalAlerts(alertType, startDate, endDate);
    const response = helper_1.createResponse("OK", { data: totalAlerts }, undefined);
    const errorMessage = {
        "errorMessage": "request timed out after 30seconds"
    };
    console.log(totalAlerts);
    res.json(response);
})));
app.post('/topFive', [express_validator_1.body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    express_validator_1.body("startDate", "startDate is invalid").isString(),
    express_validator_1.body("endDate", "endDate is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { alertType, startDate, endDate } = req.body;
    const updated = yield webapp_1.default.topFiveAlert(alertType, startDate, endDate);
    const response = helper_1.createResponse("OK", updated, undefined);
    res.json(response);
})));
app.post('/locationWise', [express_validator_1.body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    express_validator_1.body("startDate", "startDate is invalid").isString(),
    express_validator_1.body("endDate", "endDate is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { alertType, startDate, endDate } = req.body;
    const updated = yield webapp_1.default.locationWiseAlert(alertType, startDate, endDate);
    const response = helper_1.createResponse("OK", updated, undefined);
    res.json(response);
})));
app.post('/dashFilter', [express_validator_1.body('alertType', "alertType is too short").optional().isString().isLength({ min: 1 }),
    express_validator_1.body("alertName", "alertName is invalid").optional().isString(),
    express_validator_1.body("vehicleID", "vehicleID is invalid").optional().isString(),
    express_validator_1.body("startDate", "startDate is invalid").optional().isString(),
    express_validator_1.body("endDate", "endDate is invalid").optional().isString(),
    express_validator_1.body("model", "model is invalid").optional().isString(),
    express_validator_1.body("subModel", "subModel is invalid").optional().isString(),
    express_validator_1.body("location", "location is invalid").optional().isString(),
    express_validator_1.body("subLocation", "subLocation is invalid").optional().isString(),
    express_validator_1.body("batteryId", "batteryId is invalid").optional().isString(),
    express_validator_1.body("customerId", "customerId is invalid").optional().isString(),
    express_validator_1.body("timeFrame", "timeFrame is invalid").optional().isString(),
    express_validator_1.body("pageNo", "pageNo is invalid").toInt(),
    express_validator_1.body("pageSize", "pageSize is invalid").toInt(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { alertType, startDate, endDate, vehicleID, alertName, model, subModel, location, subLocation, batteryId, customerId, timeFrame, pageNo, pageSize } = req.body;
    const result = yield webapp_1.default.dashFilter({
        alertType, startDate, endDate, vehicleID,
        alertName, model, subModel, location, subLocation, batteryId, customerId, timeFrame, pageNo, pageSize
    });
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/additionalInsight', [express_validator_1.body("vehicleId", "vehicleId is invalid").optional().isString(),
    express_validator_1.body("customerId", "customerId is invalid").optional().isString(),
    express_validator_1.body('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    express_validator_1.body("alertName", "alertName is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId, customerId, alertId, alertName } = req.body;
    const updated = yield webapp_1.default.additionalInsight(vehicleId, alertId, alertName, customerId);
    const response = helper_1.createResponse("OK", updated, undefined);
    res.json(response);
})));
app.post('/pastAlerts', [express_validator_1.body("vehicleId", "vehicleId is invalid").isString().isLength({ min: 1 }),
    express_validator_1.body("customerId", "customerId is invalid").optional().isString(),
    express_validator_1.body('alertId', "alertId is too short").optional().toInt(),
    express_validator_1.body("alertName", "alertName is invalid").isString().isLength({ min: 1 }),
    express_validator_1.body("pageNo", "pageNo is invalid").toInt(),
    express_validator_1.body("pageSize", "pageSize is invalid").toInt(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId, alertId, alertName, pageNo, pageSize } = req.body;
    const result = yield webapp_1.default.pastAlerts(vehicleId, alertId, alertName, pageNo, pageSize);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/clearAlert', [express_validator_1.body("vehicleId", "vehicleId is invalid").isString().isLength({ min: 1 }),
    express_validator_1.body('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    express_validator_1.body("alertName", "alertName is invalid").isString().isLength({ min: 1 }),
    express_validator_1.body("comment", "comment is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId, comment, alertId, alertName } = req.body;
    const result = yield webapp_1.default.clearAlert(vehicleId, alertId, alertName, comment);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.get('/lowMileage', [express_validator_1.query("vehicleId", "vehicleId is invalid").optional().isString(),
    express_validator_1.query('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    express_validator_1.query("alertName", "alertName is invalid").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId, alertId, alertName } = req.query;
    const result = yield webapp_1.default.lowMileageGraph(vehicleId, alertId, alertName);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.get('/graphs', [express_validator_1.query("vehicleId", "vehicleId is invalid").isString(),
    express_validator_1.query('alertTypeId', "alertTypeId is too short").toInt(),
    express_validator_1.query('alertId', "alertId is too short").toInt(),
    express_validator_1.query('alertName', "alertName is too short").isString(),
    express_validator_1.query('alertCode', "alertCode is too short").isString(),
    express_validator_1.query('timeStamp', "timeStamp is too short").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start API :", new Date());
    const { vehicleId, alertId, alertName, alertTypeId, timeStamp, alertCode } = req.query;
    const result = yield webapp_1.default.getDynamicSubGraph(vehicleId, alertId, alertTypeId, alertName, timeStamp, alertCode);
    const response = helper_1.createResponse("OK", result, undefined);
    console.log("End API :", new Date());
    res.json(response);
})));
app.get('/alertDetails/:alertId', [express_validator_1.param('alertId', "alertId is too short").toInt(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield webapp_1.default.getAlertDetails(req.params.alertId);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/search', [express_validator_1.body('frameId', "frameId is required").isString(),
    express_validator_1.body('pageNo', "pageNo is required").toInt(),
    express_validator_1.body('pageSize', "pageSize is required").toInt(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNo, pageSize, frameId } = req.body;
    const result = yield webapp_1.default.vehicleSearch(frameId, pageSize, pageNo);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/createUser', [express_validator_1.body('userEmail', "userEmail is required").isString(),
    express_validator_1.body('userRole', "userRole is required").isString(),
    express_validator_1.body('password', "password is required").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userRole, password, userEmail } = req.body;
    const result = yield lambdaService_1.createWebAppUser({
        userEmail,
        userRole,
        password
    });
    const response = helper_1.createResponse("OK", result.response, result.err);
    res.json(response);
})));
app.delete('/deleteUser', [express_validator_1.body('userEmail', "userEmail is required").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    const result = yield lambdaService_1.deleteWebAppUser({ userEmail });
    const response = helper_1.createResponse("OK", result.response, result.err);
    res.json(response);
})));
app.post('/quicksight', expressQAsync(webSecure), [express_validator_1.body('dashboardId', "dashboardId is too short").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, idToken } = res.locals.user;
    // DashboardId: "e3cf1a0d-04f4-442b-8276-a359cada2b32",
    const dashboardId = req.body.dashboardId;
    const result = yield getQuickSightUrl_1.getEmbedUrl(idToken, email, dashboardId);
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.get('/getDashboard', expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.default.findAll();
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/createDashboard', [express_validator_1.body('dashboardId', "dashboardId is required").isString(),
    express_validator_1.body('dashboardName', "dashboardName is required").isString(),
    express_validator_1.body('dashboardImageUrl', "dashboardImageUrl is required").isString(),
    express_validator_1.body('authorizedGroup', "authorizedGroup is an array required")
        .isArray().isLength({ min: 1 }), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { dashboardId, dashboardName, dashboardImageUrl, authorizedGroup } = req.body;
    const result = yield service_1.default.createNew({ dashboardId, dashboardName, dashboardImageUrl, authorizedGroup });
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.post('/updateDashboard', [express_validator_1.body('dashboardId', "dashboardId is required").isString(),
    express_validator_1.body('dashboardName', "dashboardName is required").isString(),
    express_validator_1.body('dashboardImageUrl', "dashboardImageUrl is required").isString(),
    express_validator_1.body('authorizedGroup', "authorizedGroup is an array required")
        .isArray().isLength({ min: 1 }), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { dashboardId, dashboardName, dashboardImageUrl, authorizedGroup } = req.body;
    const result = yield service_1.default.updateWhere({ dashboardId }, { dashboardName, dashboardImageUrl, authorizedGroup });
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.delete('/deleteDashboardId/:dashboardId', [express_validator_1.param('dashboardId', "dashboardId is required").isString().isLength({ min: 1 }), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dashboardId = req.params.dashboardId;
    const result = yield service_1.default.deleteWhere({ dashboardId });
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.get('/customerLiveLocation/:customerId', [express_validator_1.param('customerId', "customerId is too short").isString(),
    express_validator_1.query('location', "location is too short").isString(),
    express_validator_1.query('zone', "zone is too short").isString(), validate], expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, zone } = req.query;
    const result = yield webapp_1.default.getCustomerLiveLocations(req.params.customerId, location, zone);
    // if (result[0].st==="false"){
    //   throw new BadRequestError("No data available for customerId")
    // }
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
/////////api to give vehicle filter option and location filter option in subheader of webapp////////////////
app.get('/dropdownFilters', expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield webapp_1.default.getDropdownFilters();
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.get('/mapViewFilters', expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield webapp_1.default.getMapViewDropdownFilters();
    const response = helper_1.createResponse("OK", result, undefined);
    res.json(response);
})));
app.use(expressErrorHandler);
exports.default = app;
