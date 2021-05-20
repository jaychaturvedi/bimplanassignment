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
const app = express_1.default.Router();
app.get('/', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield service_1.default.findAll();
    const response = helper_1.createResponse("OK", feedback, undefined);
    res.json(response);
})));
app.get('/:rideId', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.rideId;
    const feedback = yield service_1.default.findById(Id);
    const response = helper_1.createResponse("OK", feedback, undefined);
    res.json(response);
})));
app.post('/', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield service_1.default.createNew(req.body);
    const response = helper_1.createResponse("OK", feedback, undefined);
    res.json(response);
})));
app.put('/:rideId', [
    express_validator_1.param('rideId', "rideId can't be empty").isLength({ min: 1 }),
    express_validator_1.body('options', "options list can't be empty").optional(),
    helper_1.validate
], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const updated = yield service_1.default.updateById(rideId, req.body);
    const response = helper_1.createResponse("OK", updated, undefined);
    res.json(response);
})));
app.delete('/:rideId', [express_validator_1.param('rideId', "rideId can't be empty").isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.rideId;
    const deleted = yield service_1.default.deleteById(rideId);
    const response = helper_1.createResponse("OK", "Feedback deleted ", undefined);
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
