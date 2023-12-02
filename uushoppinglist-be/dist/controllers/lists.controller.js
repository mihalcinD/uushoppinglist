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
exports.deleteList = exports.patchList = exports.createList = exports.getList = exports.getLists = void 0;
const validator_1 = require("../helpers/validator");
const general_schema_1 = require("../schemas/general.schema");
const lists_schema_1 = require("../schemas/lists.schema");
const list_model_1 = __importDefault(require("../models/list.model"));
const Error_1 = require("../helpers/Error");
const getLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sub = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.payload.sub;
        (0, validator_1.validate)(general_schema_1.generalSchema.userIdentifierSchema, sub);
        const lists = yield list_model_1.default.find({ $or: [{ ownerID: sub }, { membersIDs: sub }] }).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        let editedLists = [];
        for (let list of lists) {
            // @ts-ignore
            let editedList = list.toObject();
            editedList.isOwner = list.ownerID === sub;
            editedLists.push(editedList);
        }
        next(editedLists);
    }
    catch (error) {
        next(error);
    }
});
exports.getLists = getLists;
const getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = req.params.listID;
        const sub = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.payload.sub;
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, id);
        (0, validator_1.validate)(general_schema_1.generalSchema.userIdentifierSchema, sub);
        const list = yield list_model_1.default.findById(id).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        //@ts-ignore
        let editedList = list.toObject();
        editedList.isOwner = editedList.ownerID === sub;
        next(editedList);
    }
    catch (error) {
        next(error);
    }
});
exports.getList = getList;
const createList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const data = req.body;
        const sub = (_c = req.auth) === null || _c === void 0 ? void 0 : _c.payload.sub;
        (0, validator_1.validate)(lists_schema_1.listsSchema.createSchema, data);
        (0, validator_1.validate)(general_schema_1.generalSchema.userIdentifierSchema, sub);
        const list = yield list_model_1.default.create({
            ownerID: sub,
            membersIDs: [sub, ...((_d = data.membersIDs) !== null && _d !== void 0 ? _d : [])],
            name: data.name,
            isArchived: false,
            items: (_e = data.items) !== null && _e !== void 0 ? _e : [],
        }).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        //@ts-ignore
        let editedList = list.toObject();
        editedList.isOwner = editedList.ownerID === sub;
        next(editedList);
    }
    catch (error) {
        next(error);
    }
});
exports.createList = createList;
const patchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const data = req.body;
        const id = req.params.listID;
        const sub = (_f = req.auth) === null || _f === void 0 ? void 0 : _f.payload.sub;
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, id);
        (0, validator_1.validate)(lists_schema_1.listsSchema.updateSchema, data);
        (0, validator_1.validate)(general_schema_1.generalSchema.userIdentifierSchema, sub);
        const list = yield list_model_1.default.findByIdAndUpdate(id, data, { returnDocument: 'after' }).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        //@ts-ignore
        let editedList = list.toObject();
        editedList.isOwner = editedList.ownerID === sub;
        next(editedList);
    }
    catch (error) {
        next(error);
    }
});
exports.patchList = patchList;
const deleteList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.listID;
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, id);
        yield list_model_1.default.findByIdAndDelete(id).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        res.status(204);
        next({});
    }
    catch (error) {
        next(error);
    }
});
exports.deleteList = deleteList;
//# sourceMappingURL=lists.controller.js.map