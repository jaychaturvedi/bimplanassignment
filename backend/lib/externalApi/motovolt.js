"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const request_promise_1 = require("request-promise");
const dotenv = __importStar(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
dotenv.config();
function createOptions(url, body) {
    const uri = process.env.MOTOVOLTAPI + url;
    const options = {
        uri,
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        json: true
    };
    return options;
}
class ConnectmApi {
    static validatePhone(phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/validateph', { phone_number });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getBikeStat(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getstat', {
                frameid: frameId
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getBikeLiveData(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getlivedata', {
                frameid: frameId
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getLiveLocation(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getliveloc', {
                frameid: frameId,
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getCurrentRide(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getcurride', {
                frameid: frameId
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getEndRideStat(frameId, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getendridestat', {
                frameid: frameId,
                startTime,
                endTime
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getEndRideGps(frameId, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getendridegps', {
                frameid: frameId,
                startTime,
                endTime
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getMyBike(frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getmycycle', {
                frameid: frameId
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getRideHistory(frameId, startTime, endTime, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getridehistory', {
                frameid: frameId,
                pageSize,
                pageNo,
                startTime,
                endTime
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getRideHistoryStat(frameId, startTime, endTime, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const last7days = moment_1.default(startTime).subtract(6, 'd').format('YYYY-MM-DD HH:mm:ss');
            console.log("last7days", last7days);
            const options = createOptions('/getridehistorystat', {
                frameid: frameId,
                pageSize,
                pageNo,
                startTime: last7days,
                endTime
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getNotification(frameId, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/getnotific', {
                frameid: frameId,
                pageSize,
                pageNo,
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static histEndRideStat(frameId, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/histendridestat', {
                frameid: frameId,
                tripId
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
}
exports.default = ConnectmApi;
