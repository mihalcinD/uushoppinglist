export const CreateError = (reason: string | object, statusCode: number) => {
	const error: any = new Error();
	error.message = reason;
	error.statusCode = statusCode;
	return error;
};
