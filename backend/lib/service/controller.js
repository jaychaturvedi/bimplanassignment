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
exports.paginate = exports.closeIssues = exports.createIssues = void 0;
const error_1 = require("../error");
const sequelize_1 = __importDefault(require("sequelize"));
const service_1 = __importDefault(require("./service"));
const helper_1 = require("../helper");
const Op = sequelize_1.default.Op;
function createIssues(uid, frameId, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        const issue = yield service_1.default.createNew({ uid, frameId, comments, status: 0, openTime: Date.now() });
        if (!issue)
            throw new error_1.IssuesError("Unable to report ");
        return issue;
    });
}
exports.createIssues = createIssues;
function closeIssues(serviceId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const issue = yield service_1.default.updateWhere({ serviceId }, { status, closeTime: Date.now() });
        if (!issue)
            throw new error_1.IssuesError("Unable to report ");
        return issue;
    });
}
exports.closeIssues = closeIssues;
function paginate(pageNumber, pageSize, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        let paginate = {};
        if (pageNumber || pageSize) {
            paginate = helper_1.pagination(pageNumber, pageSize);
        }
        const issues = yield service_1.default.paginate(paginate, condition);
        if (!issues)
            throw new error_1.IssuesError("Unable to find data");
        return issues;
    });
}
exports.paginate = paginate;
