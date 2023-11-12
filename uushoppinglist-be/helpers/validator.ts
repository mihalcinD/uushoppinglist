import { ValidateFunction } from 'ajv';
import { CreateError } from './Error';

export const validate = (schema: ValidateFunction<any>, data: object | string) => {
	const valid = schema(data);
	if (!valid) {
		throw CreateError(schema.errors ?? 'Wrong input data', 400);
	}
};
