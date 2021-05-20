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
app.get('/all', helper_1.expressQAsync(helper_1.secure), [express_validator_1.query('pageNo', "pageNo. be empty").optional().toInt().isLength({ min: 1 }),
    express_validator_1.query('pageSize', "pageSize is empty").optional().toInt().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status ? 1 : 0;
    const { pageNo, pageSize } = req.query;
    const open = yield controller_1.paginate(pageNo, pageSize, { status: 0 });
    const closed = yield controller_1.paginate(pageNo, pageSize, { status: 1 });
    const sortedOpen = open.rows.sort(function (a, b) {
        return b.openTime - a.openTime;
    });
    const sortedClosed = closed.rows.sort(function (a, b) {
        return b.openTime - a.openTime;
    });
    const response = helper_1.createResponse("OK", {
        open: {
            count: open.count,
            rows: sortedOpen
        },
        closed: {
            count: closed.count,
            rows: sortedClosed
        }
    }, undefined);
    res.send(response);
})));
//get single job
app.get('/:serviceId', helper_1.expressQAsync(helper_1.secure), [express_validator_1.param('serviceId', "serviceId can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    const issue = yield service_1.default.findWhere({ serviceId });
    const response = helper_1.createResponse("OK", issue, undefined);
    res.json(response);
})));
app.post('/', helper_1.expressQAsync(helper_1.secure), [express_validator_1.body('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    express_validator_1.body('comments', "comments can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { comments, frameId } = req.body;
    const issue = yield controller_1.createIssues(res.locals.user.uid, frameId, comments); //one more field of frameId
    const response = helper_1.createResponse("OK", issue, undefined);
    res.json(response);
})));
app.put('/', helper_1.expressQAsync(helper_1.secure), [express_validator_1.body('status', "status can't be empty").toInt().isLength({ min: 1 }),
    express_validator_1.body('serviceId', "serviceId can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, status } = req.body;
    const issue = yield controller_1.closeIssues(serviceId, status);
    const response = helper_1.createResponse("OK", issue, undefined);
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
