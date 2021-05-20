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
exports.initNewFaqQnA = exports.deleteUpgrade = exports.findAllUpgrades = exports.createNewFaqQnA = void 0;
const error_1 = require("../error");
const service_1 = __importDefault(require("./service"));
const controller_1 = require("../faq/controller");
function createNewFaqQnA(id, faqId, Question, Answer) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUpgrades = yield service_1.default.createNew({ id, faqId, Question, Answer });
        if (!newUpgrades)
            throw new error_1.SupportError("Unable to create ");
        return newUpgrades;
    });
}
exports.createNewFaqQnA = createNewFaqQnA;
function findAllUpgrades() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUpgrades = yield service_1.default.findAll();
        if (!allUpgrades)
            throw new error_1.SupportError("Unable to find all ");
        return allUpgrades;
    });
}
exports.findAllUpgrades = findAllUpgrades;
function deleteUpgrade(id, faqId) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUpgrades = yield service_1.default.deleteWhere({ id, faqId });
        if (!allUpgrades)
            throw new error_1.SupportError("Unable to delete user");
        return allUpgrades;
    });
}
exports.deleteUpgrade = deleteUpgrade;
function initNewFaqQnA() {
    return __awaiter(this, void 0, void 0, function* () {
        const faqs = controller_1.FaqList.sections.map((item) => __awaiter(this, void 0, void 0, function* () {
            const result = item.faq.map((item) => __awaiter(this, void 0, void 0, function* () {
                yield createNewFaqQnA(item.id, item.faqId, item.Question, item.Answer);
                return;
            }));
            return item;
        }));
        // if (!faqs) throw new SupportError("Unable to create ")
        return faqs;
    });
}
exports.initNewFaqQnA = initNewFaqQnA;
