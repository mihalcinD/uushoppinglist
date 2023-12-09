import { getLists, getList, deleteList, patchList } from '../controllers/lists.controller';
import { next, res, auth } from './helpers';
import List from '../models/list.model';
import { expect, jest, test } from '@jest/globals';
import { Request } from 'express';
jest.mock('../models/list.model');

describe('List', () => {
	describe('Get lists', () => {
		const req = {
			auth,
		} as Request;
		//@ts-ignore
		List.find.mockImplementationOnce(async () => {
			return [
				{
					toObject: jest.fn(x => {
						return { ownerID: auth.payload.sub };
					}),
				},
			];
		});

		it('should return object with success = true and array of lists', async () => {
			await getLists(req, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: true, result: expect.any(Array) }));
		});

		const reqWithoutSub = {} as Request;

		it('should return object with success = false and status = 400', async () => {
			await getLists(reqWithoutSub, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});
	});

	describe('Get list', () => {
		const req = {
			auth,
			params: { listID: '222222222222222222222222' },
		} as any as Request;
		//@ts-ignore
		List.findById.mockImplementationOnce(async () => {
			return {
				toObject: jest.fn(x => {
					return { ownerID: auth.payload.sub };
				}),
			};
		});

		it('should return object with success = true and the list', async () => {
			await getList(req, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: true, result: expect.any(Object) }));
		});

		const reqWrongParam = {
			auth,
			params: { listID: '222' },
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await getList(reqWrongParam, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});
	});

	describe('Delete list', () => {
		const req = {
			auth,
			params: { listID: '222222222222222222222222' },
		} as any as Request;
		//@ts-ignore
		List.findByIdAndDelete.mockImplementationOnce(async () => {
			return {};
		});

		it('should return status 204', async () => {
			await deleteList(req, res, next);
			expect(res.status).toHaveBeenCalledWith(204);
		});

		const reqWrongParam = {
			auth,
			params: { listID: '222' },
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await deleteList(reqWrongParam, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});
	});

	describe('Update list', () => {
		const req = {
			auth,
			params: { listID: '222222222222222222222222' },
			body: { name: 'New name' },
		} as any as Request;
		//@ts-ignore
		List.findByIdAndUpdate.mockImplementationOnce(async () => {
			return {
				toObject: jest.fn(x => {
					return { ownerID: auth.payload.sub };
				}),
			};
		});

		it('should return object with success = true and the updated list', async () => {
			await patchList(req, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: true, result: expect.any(Object) }));
		});

		const reqWrongParam = {
			auth,
			params: { listID: '222' },
			body: { name: 'New name' },
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await patchList(reqWrongParam, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});

		const reqWrongBody = {
			auth,
			params: { listID: '222222222222222222222222' },
			body: {},
		} as any as Request;

		it('should return object with success = false and status = 400', async () => {
			await patchList(reqWrongBody, res, next);
			expect(next).toReturnWith(expect.objectContaining({ success: false, status: 400 }));
		});
	});
});
