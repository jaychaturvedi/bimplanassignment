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
exports.deleteAppCognitoAndDbUser = void 0;
const AWS = require('aws-sdk');
const request_promise_1 = __importDefault(require("request-promise"));
const dotenv = __importStar(require("dotenv"));
const globalAny = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null;
const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;
const userPoolRegion = 'us-east-2';
const userPoolID = 'us-east-2_3ErdY8hH0'; //zelp_app_authentication
const userPoolWebClientID = '201rvp9cga1v0foim2aab6g3of';
dotenv.config();
const accessKeyId = process.env.ACCESSKEYID;
const secretAccessKey = process.env.SECRETKEY;
const region = "us-east-2";
// configure Amplify
Amplify.configure({
    Auth: {
        region: userPoolRegion,
        userPoolId: userPoolID,
        userPoolWebClientId: userPoolWebClientID,
    },
});
//AWS config
AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region });
var CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
var client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
function deleteUser(params) {
    let options = {
        method: 'DELETE',
        uri: process.env.MOBILEAPIURL + params.Username,
        json: true
    };
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");
    return new Promise((resolve, reject) => {
        //delete from cognito pool
        client.adminDeleteUser(params).promise()
            .then(() => {
            console.warn(".. delete_cognito: complete");
            //now delete from sql db by hitting user endpoint
            return request_promise_1.default(options);
        })
            .then((response) => {
            console.log("DELETE succeeded with status ", response);
            //response type is {status,body,error,data}
            resolve(response.body);
        })
            .catch((err) => {
            console.error(".. delete_cognito: error");
            console.error(err.code, err.message, err.statusCode);
            reject({ code: err.code, message: err.message, statusCode: err.statusCode });
        });
    });
}
// lambda function to be triggered to create new user
exports.deleteAppCognitoAndDbUser = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    var params = {
        UserPoolId: userPoolID,
        Username: phone
    };
    let responseBody;
    let deletedDbUser;
    let errorBody;
    try {
        responseBody = yield deleteUser(params);
        console.log(responseBody);
    }
    catch (e) {
        deletedDbUser = yield request_promise_1.default({
            method: 'DELETE',
            uri: process.env.MOBILEAPIURL + params.Username,
            json: true
        });
        console.log(deletedDbUser);
        errorBody = e;
    }
    const response = { response: responseBody, err: errorBody };
    return response;
});
