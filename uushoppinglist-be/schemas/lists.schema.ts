import Ajv from 'ajv';
import { identifierSchema, userIdentifierSchema } from './general.schema';

const ajv = new Ajv();

const createSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
		},
		membersIDs: {
			type: 'array',
			items: userIdentifierSchema,
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

export const listsSchema = {
	createSchema: ajv.compile(createSchema),
	updateSchema: ajv.compile(updateSchema),
	identifierSchema: ajv.compile(identifierSchema),
};
