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
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const routes_1 = __importDefault(require("./user/routes"));
const routes_2 = __importDefault(require("./bike/routes"));
const routes_3 = __importDefault(require("./service/routes"));
const routes_4 = __importDefault(require("./feedback/routes"));
const routes_5 = __importDefault(require("./rides/routes"));
const routes_6 = __importDefault(require("./features/routes"));
const routes_7 = __importDefault(require("./faqQnA/routes"));
const routes_8 = __importDefault(require("./faq/routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const bodyparser = __importStar(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const service_1 = __importDefault(require("./user/service"));
const routes_9 = __importDefault(require("./webapp/routes"));
dotenv.config();
const app = express_1.default();
app.use(cors_1.default());
// app.options('/*', cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/user", routes_1.default);
app.use("/bike", routes_2.default);
app.use("/feedback", routes_4.default);
app.use("/ride", routes_5.default);
app.use("/service", routes_3.default);
app.use("/feature", routes_6.default);
app.use("/faq", routes_8.default);
app.use("/qna", routes_7.default);
app.use("/webapp", routes_9.default);
const PORT = Number(process.env.SPORT) || 5000;
db_1.default.sync({ alter: true }).then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); }));
module.exports.handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("context", context, "\nevent", event);
    app.use("/user", routes_1.default);
    app.use("/bike", routes_2.default);
    app.use("/feedback", routes_4.default);
    app.use("/ride", routes_5.default);
    app.use("/service", routes_3.default);
    app.use("/feature", routes_6.default);
    app.use("/faq", routes_8.default);
    app.use("/qna", routes_7.default);
    app.use("/webapp", routes_9.default);
    const handler = serverless_http_1.default(app);
    try {
        yield db_1.default.authenticate();
    }
    catch (error) {
        yield db_1.default.sync({ alter: true, force: false });
    }
    const result = yield handler(event, context);
    return result;
});
// will be pushed other file
// lambda function to be triggered to create new user
module.exports.createUser = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.parse(event.body);
    const uid = body.uid;
    const phone = body.phoneNumber;
    console.log("new user", { uid: uid, phone: phone });
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("connecting for CreateUser");
    yield db_1.default.sync({ alter: true, force: false });
    const newUser = yield service_1.default.createNew({ uid: uid, phone: phone });
    console.log(newUser);
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "user_creation"
        },
        body: JSON.stringify({ uid: uid, phone: phone }),
        isBase64Encoded: false
    };
    context.succeed(response);
});
module.exports.webapp = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    // context.callbackWaitsForEmptyEventLoop = false;
    app.use("/webV1", routes_9.default);
    const webapp = serverless_http_1.default(app);
    console.log("connecting");
    try {
        yield db_1.default.authenticate();
        console.log("connection ok");
    }
    catch (error) {
        console.log("connecting");
        yield db_1.default.sync({ alter: true, force: false });
    }
    console.log("Start Result", new Date());
    const result = yield webapp(event, context);
    console.log("Return Result ", new Date());
    return result;
});
