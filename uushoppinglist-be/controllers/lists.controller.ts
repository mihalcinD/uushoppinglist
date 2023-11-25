import { NextFunction, Request, Response } from 'express';
import { validate, validateSub } from '../helpers/validator';
import { generalSchema } from '../schemas/general.schema';
import { listsSchema } from '../schemas/lists.schema';
import List from '../models/list.model';
import { CreateError } from '../helpers/Error';

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//validateSub(req.auth?.payload.sub);
		const testingSub = req.auth?.payload.sub ?? 111;
		const lists = await List.find({ $or: [{ ownerID: testingSub }, { membersIDs: testingSub }] }).catch(err => {
			throw CreateError(err, 500);
		});
		next(lists);
	} catch (error) {
		next(error);
	}
};

export const getList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);
		const list = await List.findById(id).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};

export const createList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		validate(listsSchema.createSchema, data);
		//validateSub(req.auth?.payload.sub);
		const testingSub = req.auth?.payload.sub ?? 111;
		const list = await List.create({
			ownerID: testingSub,
			membersIDs: [testingSub, ...(data.membersIDs ?? [])],
			name: data.name,
			isArchived: false,
			items: data.items ?? [],
		}).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};

export const patchList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);
		validate(listsSchema.updateSchema, data);
		const list = await List.findByIdAndUpdate(id, data, { returnDocument: 'after' }).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);
		await List.findByIdAndDelete(id).catch(err => {
			throw CreateError(err, 500);
		});
		res.status(204);
		next({});
	} catch (error) {
		next(error);
	}
};
