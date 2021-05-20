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
exports.UpgradesList = exports.deleteUpgrade = exports.findAllUpgrades = exports.initNewUpgradeList = exports.createNewUpgrade = void 0;
const error_1 = require("../error");
const service_1 = __importDefault(require("./service"));
function createNewUpgrade(id, name, icon, price) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUpgrades = yield service_1.default.createNew({ id, name, price, icon });
        if (!newUpgrades)
            throw new error_1.SupportError("Unable to create ");
        return newUpgrades;
    });
}
exports.createNewUpgrade = createNewUpgrade;
function initNewUpgradeList() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = exports.UpgradesList.map((item, index) => __awaiter(this, void 0, void 0, function* () {
            const newUpgrades = yield service_1.default.createNew({
                id: index,
                name: item.name,
                price: item.price,
                icon: item.icon
            });
            return newUpgrades;
        }));
        return result;
    });
}
exports.initNewUpgradeList = initNewUpgradeList;
function findAllUpgrades() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUpgrades = yield service_1.default.findAll();
        if (!allUpgrades)
            throw new error_1.SupportError("Unable to find all ");
        return allUpgrades;
    });
}
exports.findAllUpgrades = findAllUpgrades;
function deleteUpgrade(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUpgrades = yield service_1.default.deleteWhere({ name });
        if (!allUpgrades)
            throw new error_1.SupportError("Unable to delete user");
        return allUpgrades;
    });
}
exports.deleteUpgrade = deleteUpgrade;
exports.UpgradesList = [
    {
        name: "Find my Bike",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/cycle.png",
        price: 25
    },
    {
        name: "Theft Detection",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/theft.png",
        price: 75
    },
    {
        name: "Geo Fencing",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/geo-fencing.png",
        price: 50
    },
    {
        name: "Ride Statistics",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/ride-statistics.png",
        price: 50
    },
    {
        name: "Smart Inspection",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/smart-inspection.png",
        price: 25
    },
    {
        name: "Remote Lock",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/lock.png",
        price: 55
    },
    {
        name: "Battery Analytics",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/battery-analytics.png",
        price: 35
    },
    {
        name: "Online Store",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/online-store.png",
        price: 0
    }
];
