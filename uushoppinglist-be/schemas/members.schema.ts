import Ajv from 'ajv';
import { userIdentifierSchema } from './general.schema';

const ajv = new Ajv();

const addSchema = {
	type: 'object',
	properties: {
		memberID: userIdentifierSchema,
	},
	additionalProperties: false,
	required: ['memberID'],
};

export const membersSchema = {
	addSchema: ajv.compile(addSchema),
};
