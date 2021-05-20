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
const service_1 = __importDefault(require("./service"));
const app = express_1.default.Router();
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.id;
    const bandB = b.id;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    }
    else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}
app.get('/', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const faqs = yield service_1.default.findAll();
    let faq = [];
    const sortedFaqs = faqs.map((item) => {
        console.log(item);
        faq.push({
            "id": item.id,
            "name": item.name,
            "icon": item.icon,
            "active": item.active,
            "faq": item.faqs
        });
    });
    console.log("faq array", faq);
    const response = helper_1.createResponse("OK", { sections: faq }, undefined);
    res.send(response);
})));
app.get('/init', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allFaqs = yield controller_1.initNewFaqCategory();
    console.log(allFaqs);
    const response = helper_1.createResponse("OK", allFaqs, undefined);
    res.send(response);
})));
app.post('/', [express_validator_1.body('id', "id is too short").toInt().isLength({ min: 1 }),
    express_validator_1.body('name', "name can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('icon', "icon url can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('active', "active is missing,should be true or false").isBoolean(),
    // body('faq', "faq array can't be empty").isArray(), 
    helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, icon, active } = req.body;
    const faqs = yield service_1.default.createNew({ id, name, icon, active });
    const response = helper_1.createResponse("OK", faqs, undefined);
    res.send(response);
})));
app.put('/', [express_validator_1.body('id', "id is too short").toInt().isLength({ min: 1 }),
    express_validator_1.body('name', "name can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('icon', "icon url can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('active', "active is missing,should be true or false").isBoolean(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, icon, faq, active } = req.body;
    const updated = yield service_1.default.update({ id, name, icon, active });
    const response = helper_1.createResponse("OK", updated, undefined);
    res.send(response);
})));
app.delete('/', [express_validator_1.body('id', "id is too short").optional().toInt().isLength({ min: 1 }),
    helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const faqs = yield service_1.default.deleteWhere({ id });
    const response = helper_1.createResponse("OK", "deleted", undefined);
    res.send(response);
})));
app.delete('/:id', [express_validator_1.param('id', "id is too short").toInt().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield service_1.default.deleteWhere({ id });
    const response = helper_1.createResponse("OK", "deleted successfully", undefined);
    res.send(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
