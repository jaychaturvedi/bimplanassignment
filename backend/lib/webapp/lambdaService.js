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
exports.deleteWebAppUser = exports.createWebAppUser = void 0;
const AWS = require('aws-sdk');
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const globalAny = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null;
const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;
const userPoolRegion = 'us-east-2';
const userPoolID = 'us-east-2_4yqT9fdQs'; //zelp_web_authentication
const userPoolWebClientID = '3t0apcbmln1ns8gp970j0lqjvg';
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
function createUser(params, userEmail, password) {
    let this_account = undefined;
    let this_account_details = undefined;
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");
    return new Promise((resolve, reject) => {
        client.adminCreateUser(params)
            .promise()
            .then((user) => {
            console.log("created User", user);
            return Auth.signIn(user.User.Username, password);
        })
            .then((user) => {
            return Auth.completeNewPassword(user, password, {
                email: userEmail
            });
        })
            .then((user) => {
            console.warn(".. create_cognito: confirmed..");
            this_account = user;
            // get details
            return Auth.currentAuthenticatedUser();
        })
            .then((this_details) => {
            if (!(this_details && this_details.attributes))
                throw "account creation fails";
            this_account_details = Object.assign({}, this_details.attributes);
            // signout
            return this_account.signOut();
        })
            .then(() => {
            console.warn(".. create_cognito: complete");
            resolve(this_account_details);
        })
            .catch((err) => {
            console.error(".. create_cognito: error");
            console.error(err);
            reject(err);
        });
    });
}
function deleteUser(params) {
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");
    return new Promise((resolve, reject) => {
        client.adminDeleteUser(params).promise()
            .then((user) => {
            console.warn(".. delete_cognito: complete");
            resolve("user deleted successfullyy");
        })
            .catch((err) => {
            console.error(".. delete_cognito: error");
            console.error(err);
            reject(err);
        });
    });
}
// lambda function to be triggered to create new user
exports.createWebAppUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = body.userEmail;
    const password = body.password;
    const userRole = body.userRole;
    var params = {
        UserPoolId: userPoolID,
        Username: userEmail,
        DesiredDeliveryMediums: [
            'EMAIL'
        ],
        ForceAliasCreation: false,
        TemporaryPassword: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: userEmail
            },
            {
                Name: 'email_verified',
                Value: 'True'
            },
            {
                Name: "custom:role",
                Value: userRole
            }
            /* more items */
        ]
    };
    let responseBody;
    let errorBody;
    try {
        responseBody = yield createUser(params, userEmail, password);
        console.log(responseBody);
    }
    catch (e) {
        console.log(e);
        errorBody = e;
    }
    const response = { response: responseBody, err: errorBody };
    return response;
});
exports.deleteWebAppUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = body.userEmail;
    var params = {
        UserPoolId: userPoolID,
        Username: userEmail
    };
    let responseBody;
    let errorBody;
    try {
        responseBody = yield deleteUser(params);
        console.log(responseBody);
    }
    catch (e) {
        console.log(e);
        errorBody = e;
    }
    const response = { response: responseBody, err: errorBody };
    return response;
});
