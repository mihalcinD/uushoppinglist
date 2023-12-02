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
exports.getProfile = exports.isAuthorized = exports.getUserInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const profiles_1 = require("../types/enums/profiles");
const list_model_1 = __importDefault(require("../models/list.model"));
function getUserInfo(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.ISSUER_BASE_URL + '/userinfo';
        return new Promise((resolve, reject) => {
            if (req.auth) {
                axios_1.default
                    .get(uri, {
                    headers: {
                        Authorization: `Bearer ${req.auth.token}`,
                    },
                })
                    .then(response => {
                    resolve(response.data);
                })
                    .catch(error => {
                    resolve(undefined);
                });
            }
            else {
                resolve(undefined);
            }
        });
    });
}
exports.getUserInfo = getUserInfo;
const isAuthorized = (userID, listID, profiles) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID)
        return false;
    const profile = yield (0, exports.getProfile)(userID, listID);
    if (profile)
        for (let _profile of profiles) {
            if (_profile === profile)
                return true;
        }
    return false;
});
exports.isAuthorized = isAuthorized;
const getProfile = (userID, listID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userID)
        return;
    const list = yield list_model_1.default.findById(listID);
    if (list) {
        if (userID === list.ownerID)
            return profiles_1.Profiles.OWNER;
        if (list.membersIDs.includes(userID))
            return profiles_1.Profiles.MEMBER;
    }
    return;
});
exports.getProfile = getProfile;
//# sourceMappingURL=profile.js.map