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
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = require("request-promise");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function createOptions(url, body) {
    const uri = process.env.WEBAPPAPI + url;
    console.log("WEBAPPAPI", uri);
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
class WebAPI {
    static mainAlerts(alertType, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start Yantrs Time", new Date());
            const options = createOptions('/allalerts', { alertType, pageNo, pageSize });
            const fetchedData = yield request_promise_1.post(options);
            console.log("End Yantra time", new Date);
            return fetchedData;
        });
    }
    static totalAlerts(alertType, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/trendtotalerts', { alertType, startDate, endDate });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static topFiveAlert(alertType, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/trndgphtopfivalrt', { alertType, startDate, endDate });
            const fetchedData = yield request_promise_1.post(options);
            return { lines: fetchedData[0], data: fetchedData.splice(1) };
        });
    }
    static locationWiseAlert(alertType, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/trndgphlocwise', { alertType, startDate, endDate });
            const fetchedData = yield request_promise_1.post(options);
            return { lines: fetchedData[0], data: fetchedData.splice(1) };
        });
    }
    static dashFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/dashboardfilter', Object.assign({}, filter));
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static additionalInsight(vehicleId, alertId, alertName, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/additinsts', { vehicleID: vehicleId, alertId, alertName, customerId });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static pastAlerts(vehicleId, alertId, alertName, pageNo, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/pastalerts', { vehicleID: vehicleId, alertId, alertName, pageNo, pageSize });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static clearAlert(vehicleId, alertId, alertName, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/clearalerts', { vehicleID: vehicleId, alertId, alertName, comment });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getDynamicSubGraph(vehicleId, alertId, alertTypeId, alertName, timeStamp, alertCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/dynamic', {
                vehicleId,
                alertId,
                alertTypeId,
                alertName,
                timeStamp,
                alertCode
            });
            console.log("External API Start Time : ", new Date());
            const fetchedData = yield request_promise_1.post(options);
            console.log("External API End Time : ", new Date());
            return fetchedData;
        });
    }
    static getAlertDetails(alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/alertdetails', { alertId });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static vehicleSearch(frameId, pageSize, pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/vehsearch', {
                frameId: frameId,
                pageSize: pageSize,
                pageNo: pageNo
            });
            console.log("External API Start Time: ", new Date());
            const fetchedData = yield request_promise_1.post(options);
            console.log("External API End Time: ", new Date());
            return fetchedData;
        });
    }
    static lowMileageGraph(vehicleId, alertId, alertName) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/maingraph', { vehicleID: vehicleId, alertId, alertName });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static getCustomerLiveLocations(customerId, location, zone) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("External API Start Time: ", new Date());
            const options = {
                uri: "https://fwvwsm1jsh.execute-api.us-east-2.amazonaws.com/yantra/custlivelocation",
                body: { custId: customerId, location, zone },
                headers: { 'Content-Type': 'application/json' },
                json: true
            };
            const fetchedData = yield request_promise_1.post(options);
            console.log("External API End Time : ", new Date());
            return fetchedData;
        });
    }
    static getDropdownFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield request_promise_1.get(createOptions('/vehicledropdown', undefined));
            const location = yield request_promise_1.get(createOptions('/locationdropdown', undefined));
            return { vehicle, location };
        });
    }
    static getMapViewDropdownFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            const mapViewFilters = yield request_promise_1.get(createOptions('/mapviewdropdown', undefined));
            //mapViewFilters is an array
            return mapViewFilters;
        });
    }
    ///////////////////////////////////////not using below routes//////////////////////////////
    static batteryCellGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 1,
                alertName: "voltage deviation"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static vehicleUsageGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 2,
                alertName: "vehicle active or idle"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static batteryTempGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 3,
                alertName: "high operating temperature "
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static unitVoltageGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 4,
                alertName: "unit over voltage"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static chargingTempGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 5,
                alertName: "high charging temperature "
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static chargingCurrentGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 6,
                alertName: "charging over current"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static highSocGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 7,
                alertName: "high soc"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static batteryTempDiffGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 8,
                alertName: "excessive temperature difference"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
    static speedGraph(vehicleId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = createOptions('/subgraph/dynamic', {
                vehicleID: vehicleId,
                alertId,
                alertTypeId: 9,
                alertName: "hall sensor fault"
            });
            const fetchedData = yield request_promise_1.post(options);
            return fetchedData;
        });
    }
}
exports.default = WebAPI;
