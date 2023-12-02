"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listsSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const general_schema_1 = require("./general.schema");
const ajv = new ajv_1.default();
const createSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
        },
        memberIDs: {
            type: 'array',
            items: general_schema_1.userIdentifierSchema,
        },
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', minLength: 1 },
                    isDone: { type: 'boolean' },
                },
                required: ['name'],
            },
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
        isArchived: {
            type: 'boolean',
        },
    },
    anyOf: [{ required: ['name'] }, { required: ['isArchived'] }],
    additionalProperties: false,
};
exports.listsSchema = {
    createSchema: ajv.compile(createSchema),
    updateSchema: ajv.compile(updateSchema),
    identifierSchema: ajv.compile(general_schema_1.identifierSchema),
};
