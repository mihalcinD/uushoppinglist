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
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrict = void 0;
const Error_1 = require("../helpers/Error");
const profile_1 = require("../helpers/profile");
const restrict = (profiles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //comment next 2 lines to enable authorization
        // next();
        // return;
        var _a;
        const listID = req.params.listID;
        const authorized = yield (0, profile_1.isAuthorized)((_a = req.auth) === null || _a === void 0 ? void 0 : _a.payload.sub, listID, profiles);
        if (!authorized)
            next((0, Error_1.CreateError)('User is not authorized to access this endpoint.', 403));
        next();
    });
};
exports.restrict = restrict;
