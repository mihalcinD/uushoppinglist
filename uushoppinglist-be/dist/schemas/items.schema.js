"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const createSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
        },
    },
    additionalProperties: false,
    required: ['name'],
};
const updateSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
        },
        isDone: {
            type: 'boolean',
        },
    },
    anyOf: [{ required: ['name'] }, { required: ['isDone'] }],
    additionalProperties: false,
};
exports.itemsSchema = {
    createSchema: ajv.compile(createSchema),
    updateSchema: ajv.compile(updateSchema),
};
//# sourceMappingURL=items.schema.js.map