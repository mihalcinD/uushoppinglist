import Ajv from 'ajv';

const ajv = new Ajv();

export const identifierSchema = {
	type: 'string',
	maxLength: 24,
	minLength: 24,
};

export const userIdentifierSchema = {
	type: 'string',
	maxLength: 30,
	minLength: 30,
};

export const generalSchema = {
	identifierSchema: ajv.compile(identifierSchema),
	userIdentifierSchema: ajv.compile(userIdentifierSchema),
};
