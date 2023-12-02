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
exports.deleteItem = exports.patchItem = exports.createItem = void 0;
const validator_1 = require("../helpers/validator");
const items_schema_1 = require("../schemas/items.schema");
const general_schema_1 = require("../schemas/general.schema");
const Error_1 = require("../helpers/Error");
const list_model_1 = __importDefault(require("../models/list.model"));
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const listID = req.params.listID;
        (0, validator_1.validate)(items_schema_1.itemsSchema.createSchema, data);
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, listID);
        const list = yield list_model_1.default.findByIdAndUpdate(listID, { $push: { items: data } }, { returnDocument: 'after' }).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        next(list);
    }
    catch (error) {
        next(error);
    }
});
exports.createItem = createItem;
const patchItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.params.id;
        const listID = req.params.listID;
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, listID);
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, id);
        (0, validator_1.validate)(items_schema_1.itemsSchema.updateSchema, data);
        let list;
        for (let key of Object.keys(data)) {
            list = yield list_model_1.default.findOneAndUpdate({ _id: listID, 'items._id': id }, { $set: { ['items.$.' + key]: data[key] } }, { returnDocument: 'after' }).catch(err => {
                if (list) {
                    list.data = list;
                    list.errors = err;
                    next(list);
                }
                else
                    throw (0, Error_1.CreateError)(err, 500);
            });
        }
        next(list);
    }
    catch (error) {
        next(error);
    }
});
exports.patchItem = patchItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const listID = req.params.listID;
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, listID);
        (0, validator_1.validate)(general_schema_1.generalSchema.identifierSchema, id);
        yield list_model_1.default.findByIdAndUpdate(listID, { $pull: { items: { _id: id } } }).catch(err => {
            throw (0, Error_1.CreateError)(err, 500);
        });
        res.status(204);
        next({});
    }
    catch (error) {
        next(error);
    }
});
exports.deleteItem = deleteItem;
