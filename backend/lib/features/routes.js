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
const controller_1 = require("./controller");
const app = express_1.default.Router();
app.get('/', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUpgrades = yield controller_1.findAllUpgrades();
    const response = helper_1.createResponse("OK", allUpgrades, undefined);
    res.send(response);
})));
app.get('/init', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUpgrades = yield controller_1.initNewUpgradeList();
    console.log(allUpgrades);
    const response = helper_1.createResponse("OK", allUpgrades, undefined);
    res.send(response);
})));
app.post('/', [express_validator_1.body('id', "id can't be empty").toInt(),
    express_validator_1.body('price', "price can't be empty").toInt(),
    express_validator_1.body('name', "name can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('icon', "icon can't be empty").isString().isLength({ min: 1 }),
    helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, price, name, icon } = req.body;
    const newUpgrade = yield controller_1.createNewUpgrade(id, name, icon, price); //one more field of frameId
    const response = helper_1.createResponse("OK", newUpgrade, undefined);
    res.send(response);
})));
app.delete('/', [express_validator_1.body('name', "name can't be empty").isString().isLength({ min: 1 }),
    helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller_1.deleteUpgrade(req.body.name);
    const response = helper_1.createResponse("OK", "upgrade deleted successfully", undefined);
    res.send(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
