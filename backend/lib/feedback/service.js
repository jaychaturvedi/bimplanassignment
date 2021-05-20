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
class Feedback {
    static findById(rideId) {
        return __awaiter(this, void 0, void 0, function* () {
            const feature = yield model_1.default.findOne({ where: { rideId } });
            if (!feature)
                throw new error_1.FeedbackError('No data available');
            return feature;
        });
    }
    static createNew(feature) {
        return __awaiter(this, void 0, void 0, function* () {
            const newfeature = yield model_1.default.create(feature);
            if (!newfeature)
                throw new error_1.FeedbackError("Feedback was not created");
            return newfeature;
        });
    }
    static updateById(rideId, feature) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Feedback.findById(rideId);
            const [isUpdated, [result]] = yield model_1.default.update(feature, {
                where: { rideId },
                returning: true
            });
            if (!isUpdated)
                throw new error_1.FeedbackError("No data to update");
            return result;
        });
    }
    static deleteById(rideId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield model_1.default.destroy({
                where: { rideId }
            });
            if (!deleted)
                throw new error_1.FeedbackError("Error while deleting data");
            return deleted;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const features = yield model_1.default.findAll();
            if (!features)
                throw new error_1.FeedbackError("Could not find any data");
            return features;
        });
    }
}
exports.default = Feedback;
