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
const lamdaService_1 = require("./lamdaService");
const app = express_1.default.Router();
app.get('/all', helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date());
    const users = yield service_1.default.findAll();
    const response = helper_1.createResponse("OK", users, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.get('/', helper_1.expressQAsync(helper_1.secure), helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date());
    const user = yield controller_1.profile(res.locals.user.uid);
    const response = helper_1.createResponse("OK", user, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//updates name and email during registration
app.put('/', helper_1.expressQAsync(helper_1.secure), [express_validator_1.body('fullName', "fullName is required").isString().isLength({ min: 1 }),
    express_validator_1.body("email", "email is required").isEmail(),
    express_validator_1.body('age', "age is required").isString().isLength({ min: 1 }),
    express_validator_1.body('gender', "gender is required").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request body", req.body);
    const uid = res.locals.user.uid;
    const { fullName, email, age, gender } = req.body;
    // if (!fullName && !email && !age && !gender) //optional condition
    //     throw new UserError("Please pass atleast one of 'fullName', 'email','age', or 'gender' ");
    const updated = yield service_1.default.updateByUid(uid, { fullName, email, age, gender });
    const response = helper_1.createResponse("OK", updated, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//post routes just for testing purpose, in prod user created by cognito
app.post('/', [express_validator_1.body('uid', "uid is too short").isString(),
    express_validator_1.body("phone", "phone is invalid").isString(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request body", req.body);
    const { phone, uid } = req.body;
    const newUser = yield service_1.default.createNew({ phone, uid });
    const response = helper_1.createResponse("OK", newUser, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.post('/create', helper_1.expressQAsync(helper_1.secure), helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request body", req.body);
    const { phone, uid } = res.locals.user;
    const newUser = yield service_1.default.createNew({ phone, uid });
    const response = helper_1.createResponse("OK", newUser, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
//for testing purpose only, need to be deleted
app.put('/update/:phone', [express_validator_1.param('phone', "phone is required in params").isString(),
    express_validator_1.body('frameId', "frameId is required in body").isString(), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request body", req.body, req.params);
    const { frameId } = req.body;
    //update frameId found from ValidatePhone API
    const updated = yield service_1.default.updateByPhone(req.params.phone, { frameId });
    const response = helper_1.createResponse("OK", updated, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.delete('/phone/:phone', [express_validator_1.param('phone', "phone can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    console.log("Start Time:", new Date(), "request for delete user", req.params);
    const deleted = yield service_1.default.deleteByPhone(phone);
    const response = helper_1.createResponse("OK", "User deleted with phone " + phone, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.delete('/cognito/:phone', [express_validator_1.param('phone', "phone can't be empty").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedDbAndCognitoUser = yield lamdaService_1.deleteAppCognitoAndDbUser(req.params.phone);
    const response = helper_1.createResponse("OK", deletedDbAndCognitoUser.response, deletedDbAndCognitoUser.err);
    console.log(response);
    res.json(response);
})));
app.delete('/:uid', [express_validator_1.param('uid', "uid is required in params").isString().isLength({ min: 1 }), helper_1.validate], helper_1.expressQAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start Time:", new Date(), "request for delete user", req.params);
    const uid = req.params.uid;
    const deleted = yield service_1.default.deleteById(uid);
    const response = helper_1.createResponse("OK", "User deleted with id " + uid, undefined);
    console.log("End Time:", new Date());
    res.json(response);
})));
app.use(helper_1.expressErrorHandler);
exports.default = app;
