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
exports.getEmbedUrl = exports.getQuickSightUrl = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const AWS = require('aws-sdk');
let awsCredentials = {
    region: "us-east-2",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETKEY
};
AWS.config.update(awsCredentials);
function getQuickSightUrl(idToken, username, dashboardId) {
    console.log('called');
    AWS.config.region = 'us-east-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-2:80f54e71-a2f9-48c8-9b39-3dde366b9410",
        Logins: {
            'cognito-idp.us-east-2.amazonaws.com/us-east-2_4yqT9fdQs': idToken
        }
    });
    var params = {
        RoleArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
        RoleSessionName: username
    };
    var sts = new AWS.STS({
        apiVersion: '2011-06-15',
        //change1
        "region": "us-east-1"
    });
    return new Promise((resolve, reject) => {
        sts.assumeRole(params, function (err, data) {
            let embedUrl;
            if (err)
                console.log("Assumwe erri :::::::::::::::::: ", err, err.stack); // an error occurred
            else {
                // console.log("data: "+data);
                var params = {
                    AwsAccountId: '447347746650',
                    Email: username,
                    IdentityType: 'IAM',
                    Namespace: 'default',
                    UserRole: 'READER',
                    IamArn: "arn:aws:iam::447347746650:role/amplify-yantraconsole-yconsolenv-155626-authRole",
                    SessionName: username
                };
                AWS.config.update({
                    accessKeyId: data.Credentials.AccessKeyId,
                    secretAccessKey: data.Credentials.SecretAccessKey,
                    sessionToken: data.Credentials.SessionToken,
                    "region": "us-east-2"
                });
                let quicksight = new AWS.QuickSight({
                    apiVersion: '2018-04-01',
                    region: "us-east-1"
                });
                quicksight.registerUser(params, function (err, data) {
                    if (err) {
                        console.log(JSON.stringify(err));
                        if (err.statusCode == 409) {
                            quicksight = new AWS.QuickSight({
                                apiVersion: '2018-04-01',
                                region: "us-east-2"
                            });
                            quicksight.getDashboardEmbedUrl({
                                AwsAccountId: "447347746650",
                                DashboardId: dashboardId,
                                IdentityType: "IAM",
                                ResetDisabled: true,
                                SessionLifetimeInMinutes: 400,
                                UndoRedoDisabled: true
                            }, function (err, data) {
                                if (!err) {
                                    console.log(Date());
                                    console.log(data, "my new embed url");
                                    resolve(data);
                                }
                                else {
                                    console.log(err);
                                    reject(err);
                                }
                            });
                        }
                        console.log("err register user ::::::::::::::::::", err, err.stack);
                    } // an error occurred
                    else {
                        quicksight = new AWS.QuickSight({
                            apiVersion: '2018-04-01',
                            region: "us-east-2"
                        });
                        console.log("Register User :::::::::::::::: =========================>\n", data);
                        quicksight.getDashboardEmbedUrl({
                            AwsAccountId: "447347746650",
                            DashboardId: dashboardId,
                            IdentityType: "IAM",
                            ResetDisabled: true,
                            SessionLifetimeInMinutes: 400,
                            UndoRedoDisabled: false
                        }, function (err, data) {
                            if (!err) {
                                console.log(Date());
                                console.log(data, "my embed url");
                                resolve(data);
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                });
            }
        });
    });
}
exports.getQuickSightUrl = getQuickSightUrl;
// getQuickSightUrl(idToken, "sonu@zelp.io")
function getEmbedUrl(idToken, email, dashboardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getQuickSightUrl(idToken, email, dashboardId);
        console.log(result, "result");
        return result;
    });
}
exports.getEmbedUrl = getEmbedUrl;
/*
1. user pool  --  application user details
2. identity pool -- quicksight
*/ 
