import { createItem } from '../controllers/items.controller';
import { next, res, auth } from './helpers';
import List from '../models/list.model';
import { expect, jest, test } from '@jest/globals';
import { Request } from 'express';
jest.mock('../models/list.model');

describe('Items', () => {
	describe('Create item', () => {
		const req = {
			auth,
			params: { listID: '222222222222222222222222' },
			body: { name: 'item name' },
		} as any as Request;

		//@ts-ignore
		List.findByIdAndUpdate.mockImplementationOnce(async () => {
			return {};
		});

		it('should return object with success = true and list with item added', async () => {
			await createItem(req, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: true, result: expect.any(Object) }));
		});

		const reqWrongBody = {
			auth,
			params: { listID: '222222222222222222222222' },
			body: { name: '' },
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await createItem(reqWrongBody, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});

		const reqWrongParam = {
			auth,
			params: { listID: '22222222222222222222222' },
			body: { name: 'item name' },
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await createItem(reqWrongParam, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});
	});
});
