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
const controller_1 = require("./controller");
const app = express_1.default.Router();
app.get('/all', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const alerts = yield service_1.default.findAll({});
    const response = helper_1.createResponse("OK", alerts.rows, undefined);
    res.json(response);
})));
app.get('/byModel', [express_validator_1.query('model', "model is empty").isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const alerts = yield service_1.default.findByModel(req.query.model);
    const response = helper_1.createResponse("OK", alerts, undefined);
    res.json(response);
})));
app.get('/byDate', [express_validator_1.query("startDate", "startDate is empty").isLength({ min: 1 }),
    express_validator_1.query('endDate', "endDate is empty").optional().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield service_1.default.findByDate(req.query.startDate, req.query.endDate);
    const response = helper_1.createResponse("OK", updated, undefined);
    res.json(response);
})));
app.get('/byLocation', [express_validator_1.query('location', "choose a location").isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const alerts = yield service_1.default.findByLocation(req.query.location);
    const response = helper_1.createResponse("OK", alerts, undefined);
    res.json(response);
})));
app.get('/search', [express_validator_1.query('id', "search by id").isLength({ min: 1 }),
    express_validator_1.query('limit', "number of rows per page").exists().toInt(),
    express_validator_1.query('page', "current page number").exists().toInt(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, id } = req.query;
    const alerts = yield controller_1.searchById(id, limit, page);
    const response = helper_1.createResponse("OK", alerts, undefined);
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
