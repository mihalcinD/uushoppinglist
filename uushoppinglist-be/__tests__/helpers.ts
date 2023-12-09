import { Response } from 'express';

export const next = jest.fn((data: any) => {
	if (data.type === 'error') {
		return {
			success: false,
			status: data.statusCode,
			reason: data.message,
		};
	}
	return {
		success: true,
		result: data.data ?? data,
	};
});

export const res = {
	status: jest.fn(code => code),
	json: jest.fn(object => object),
} as any as Response;
export const auth = { payload: { sub: '111111111111111111111111111111' } };
