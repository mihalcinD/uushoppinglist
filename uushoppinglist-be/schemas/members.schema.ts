import Ajv from 'ajv';
import { identifierSchema } from './general.schema';

const ajv = new Ajv();

const addSchema = {
	type: 'object',
	properties: {
		memberID: identifierSchema,
	},
	additionalProperties: false,
	required: ['memberID'],
};

export const membersSchema = {
	addSchema: ajv.compile(addSchema),
};
