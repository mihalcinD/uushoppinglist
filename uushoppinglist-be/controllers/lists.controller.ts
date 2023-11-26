import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { generalSchema } from '../schemas/general.schema';
import { listsSchema } from '../schemas/lists.schema';
import List from '../models/list.model';
import { CreateError } from '../helpers/Error';

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const sub = req.auth?.payload.sub;
		validate(generalSchema.userIdentifierSchema, sub);
		const lists = await List.find({ $or: [{ ownerID: sub }, { membersIDs: sub }] }).catch(err => {
			throw CreateError(err, 500);
		});

		let editedLists = [];
		for (let list of lists) {
			// @ts-ignore
			let editedList: typeof list & { isOwner: boolean } = list.toObject();
			editedList.isOwner = list.ownerID === sub;
			editedLists.push(editedList);
		}
		next(editedLists);
	} catch (error) {
		next(error);
	}
};

export const getList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.listID;
		const sub = req.auth?.payload.sub;
		validate(generalSchema.identifierSchema, id);
		validate(generalSchema.userIdentifierSchema, sub);
		const list = await List.findById(id).catch(err => {
			throw CreateError(err, 500);
		});

		//@ts-ignore
		let editedList: typeof list & { isOwner: boolean } = list.toObject();
		editedList.isOwner = editedList.ownerID === sub;

		next(editedList);
	} catch (error) {
		next(error);
	}
};

export const createList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const sub = req.auth?.payload.sub;
		validate(listsSchema.createSchema, data);
		validate(generalSchema.userIdentifierSchema, sub);
		const list = await List.create({
			ownerID: sub,
			membersIDs: [sub, ...(data.membersIDs ?? [])],
			name: data.name,
			isArchived: false,
			items: data.items ?? [],
		}).catch(err => {
			throw CreateError(err, 500);
		});

		//@ts-ignore
		let editedList: typeof list & { isOwner: boolean } = list.toObject();
		editedList.isOwner = editedList.ownerID === sub;

		next(editedList);
	} catch (error) {
		next(error);
	}
};

export const patchList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const id = req.params.listID;
		const sub = req.auth?.payload.sub;
		validate(generalSchema.identifierSchema, id);
		validate(listsSchema.updateSchema, data);
		validate(generalSchema.userIdentifierSchema, sub);
		const list = await List.findByIdAndUpdate(id, data, { returnDocument: 'after' }).catch(err => {
			throw CreateError(err, 500);
		});

		//@ts-ignore
		let editedList: typeof list & { isOwner: boolean } = list.toObject();
		editedList.isOwner = editedList.ownerID === sub;

		next(editedList);
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
