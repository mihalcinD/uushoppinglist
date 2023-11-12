import Ajv from 'ajv';

const ajv = new Ajv();

export const identifierSchema = {
	type: 'string',
	maxLength: 24,
	minLength: 24,
};

export const generalSchema = {
	identifierSchema: ajv.compile(identifierSchema),
};
