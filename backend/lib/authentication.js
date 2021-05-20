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
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const request_promise_1 = require("request-promise");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const poolData = {
    UserPoolId: process.env.USERPOOLID,
    region: process.env.REGION
};
const middleware = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get public key from aws
        // const publicKey = await axios.get(`https://cognito-idp.${poolData.region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        //     { responseType: "json" }
        // )
        const options = {
            uri: `https://cognito-idp.${poolData.region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
            headers: {
                'Content-Type': 'application/json',
            },
            json: true
        };
        const publicKey = yield request_promise_1.get(options);
        // console.log("got publickey", publicKey);
        const body = publicKey;
        let pems = {};
        var keys = body['keys'];
        for (var i = 0; i < keys.length; i++) {
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwk_to_pem_1.default(jwk);
            pems[key_id] = pem;
        }
        //jwt decode return signatue og token
        var decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
        // console.log("json decoded:", decodedJwt);
        if (!decodedJwt) {
            return { valid: false, message: "Not a valid JWT token" };
        }
        var kid = decodedJwt.header.kid;
        pem = pems[kid];
        if (!pem) {
            console.log('Invalid token');
            return { valid: false, message: "Invalid token" };
        }
        const verified = jsonwebtoken_1.default.verify(token, pem, function (err, payload) {
            if (err) {
                console.log("Expired Token.");
                return { valid: false, message: "Expired token" };
            }
            else {
                console.log("Valid Token.");
                const { sub: uid, phone_number: phone, phone_number_verified } = jwt_decode_1.default(token);
                console.log(uid);
                return { valid: true, message: "Valid JWT token" };
            }
        });
        return verified;
    }
    catch (e) {
        console.log(e);
        return { valid: false, message: "Invalid token" };
    }
});
exports.default = middleware;
