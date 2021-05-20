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
const model_1 = __importDefault(require("./model"));
const error_1 = require("../error");
const model_2 = __importDefault(require("../faqQnA/model"));
class Faq {
    static findWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.default.findOne({ where: Object.assign({}, condition) });
            if (!user)
                throw new error_1.BadRequestError(`faq id and name not found in record`);
            return user;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const faqs = yield model_1.default.findAll({
                attributes: { exclude: ['updatedAt', 'createdAt'] },
                order: [['id', 'ASC']],
                where: { active: true },
                include: [{
                        model: model_2.default,
                        attributes: { exclude: ['updatedAt', 'createdAt', 'faqId'] },
                        separate: true,
                        order: [['id', 'asc']],
                    }]
            });
            return faqs;
        });
    }
    static createNew(faq) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = faq;
            const existingFaqs = yield model_1.default.findOne({ where: { id, name } });
            if (existingFaqs) {
                throw new error_1.BadRequestError("record with same id already exists");
            }
            let newFaqs;
            try {
                newFaqs = yield model_1.default.create(faq);
            }
            catch (e) {
                throw new error_1.BadRequestError("Unable to create record because of duplicate id or name");
            }
            // if (!newFaqs) throw new BadRequestError("Unable to create record because of duplicate id or name")
            return newFaqs;
        });
    }
    static update(faq) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Faq.findWhere({ id: faq.id });
            const [isUpdated, [result]] = yield model_1.default.update(faq, {
                where: { id: faq.id },
                returning: true
            });
            if (!isUpdated)
                throw new error_1.BadRequestError("No data to update");
            return result;
        });
    }
    static deleteWhere(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: Object.assign({}, condition)
            });
            if (!deleted)
                throw new error_1.BadRequestError("No data available to delete ");
            return deleted;
        });
    }
    static findAndCountAll(paginate, where) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield model_1.default.findAndCountAll(Object.assign(Object.assign({}, paginate), { where }));
            if (!users)
                throw new error_1.BadRequestError("Unable to find and count");
            return users;
        });
    }
}
exports.default = Faq;
