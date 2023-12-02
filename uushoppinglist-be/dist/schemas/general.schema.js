"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalSchema = exports.userIdentifierSchema = exports.identifierSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
exports.identifierSchema = {
    type: 'string',
    maxLength: 24,
    minLength: 24,
};
exports.userIdentifierSchema = {
    type: 'string',
    maxLength: 30,
    minLength: 30,
};
exports.generalSchema = {
    identifierSchema: ajv.compile(exports.identifierSchema),
    userIdentifierSchema: ajv.compile(exports.userIdentifierSchema),
};
//# sourceMappingURL=general.schema.js.map