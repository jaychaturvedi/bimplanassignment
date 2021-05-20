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
exports.validate = exports.filters = exports.pagination = exports.secure = exports.expressQAsync = exports.expressErrorHandler = exports.createResponse = void 0;
const express_validator_1 = require("express-validator");
const authentication_1 = __importDefault(require("./authentication"));
const sequelize_1 = __importDefault(require("sequelize"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const error_1 = require("./error");
const Op = sequelize_1.default.Op;
function createResponse(status, body, error) {
    return {
        status: (body !== undefined) ? status : "ERROR",
        body: body ? body : null,
        error: (error !== undefined) ? {
            code: error === null || error === void 0 ? void 0 : error.code,
            name: error === null || error === void 0 ? void 0 : error.name,
            message: error === null || error === void 0 ? void 0 : error.message,
        } : null,
        date: new Date()
    };
}
exports.createResponse = createResponse;
function expressErrorHandler(err, req, res, next) {
    let status = 'ERROR';
    let statusCode = 200;
    if (err instanceof error_1.BadRequestError || err instanceof error_1.ForbiddenError ||
        err instanceof error_1.NotFoundError || err instanceof error_1.UnauthorizedError) {
        status = err.name || "UNKNOWN_ERROR";
        statusCode = err.errorCode;
    }
    else if (err instanceof error_1.UserError || err instanceof error_1.RideError ||
        err instanceof error_1.FeedbackError || err instanceof error_1.IssuesError ||
        err instanceof error_1.FeaturesError || err instanceof error_1.FeaturesError ||
        err instanceof error_1.SupportError || err instanceof error_1.AlertError) {
        status = "ERROR";
        statusCode = 200;
    }
    console.log(err.name);
    const response = createResponse(status, undefined, {
        code: err.errorCode,
        name: err.name,
        message: err.message
    });
    res.status(statusCode);
    return res.json(response);
    // next();
}
exports.expressErrorHandler = expressErrorHandler;
function expressQAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.expressQAsync = expressQAsync;
function secure(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token)
            throw new error_1.BadRequestError("No token in header");
        const decodedToken = yield authentication_1.default(token);
        console.log(decodedToken, "decodedToken");
        if (!decodedToken.valid) {
            throw new error_1.BadRequestError(decodedToken.message);
        }
        const { sub: uid, phone_number: phone, phone_number_verified } = jwt_decode_1.default(token);
        res.locals.user = { uid, phone };
        console.log(res.locals.user);
        next();
    });
}
exports.secure = secure;
function pagination(pageNumber, pageSize) {
    const limit = pageSize ? pageSize : 1;
    const offset = pageNumber ? (pageNumber - 1) * limit : 0;
    return {
        limit,
        offset
    };
}
exports.pagination = pagination;
function filters(filter) {
    var where = {};
    Object.keys(filter).forEach(function (key) {
        where[key] = { [Op.eq]: `%${filter[key]}%` };
    });
    return where;
}
exports.filters = filters;
;
function validate(req, res, next) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const errlist = errors.array().map((err) => { return err.msg; });
        return res.status(422).json({ errors: errlist });
    }
    next();
}
exports.validate = validate;
