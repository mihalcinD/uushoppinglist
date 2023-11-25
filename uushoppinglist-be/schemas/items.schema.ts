import Ajv from 'ajv';

const ajv = new Ajv();

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

export const itemsSchema = {
	createSchema: ajv.compile(createSchema),
	updateSchema: ajv.compile(updateSchema),
};
