import { ValidateFunction } from 'ajv';
import { CreateError } from './Error';

export const validate = (schema: ValidateFunction<any>, data: object | string) => {
	const valid = schema(data);
	if (!valid) {
		throw CreateError(schema.errors ?? 'Wrong input data', 400);
	}
};

export const validateSub = (sub: string | undefined) => {
	if (!sub || sub.length < 1) {
		throw CreateError('User unauthorized', 401);
	}
};
