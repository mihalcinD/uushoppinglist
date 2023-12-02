"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const general_schema_1 = require("./general.schema");
const ajv = new ajv_1.default();
const addSchema = {
    type: 'object',
    properties: {
        memberID: general_schema_1.userIdentifierSchema,
    },
    additionalProperties: false,
    required: ['memberID'],
};
exports.membersSchema = {
    addSchema: ajv.compile(addSchema),
};
//# sourceMappingURL=members.schema.js.map