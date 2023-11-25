import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { itemsSchema } from '../schemas/items.schema';
import { generalSchema } from '../schemas/general.schema';
import { CreateError } from '../helpers/Error';
import List from '../models/list.model';

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const listID = req.params.listID;
		validate(itemsSchema.createSchema, data);
		validate(generalSchema.identifierSchema, listID);
		const list = await List.findByIdAndUpdate(listID, { $push: { items: data } }).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};

export const patchItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const id = req.params.id;
		const listID = req.params.listID;
		validate(generalSchema.identifierSchema, listID);
		validate(generalSchema.identifierSchema, id);
		validate(itemsSchema.updateSchema, data);
		const list = await List.findOneAndUpdate({ _id: listID, 'items._id': id }, { $set: { 'items.$': data } }).catch(
			err => {
				throw CreateError(err, 500);
			},
		);
		next(list);
	} catch (error) {
		next(error);
	}
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const listID = req.params.listID;
		validate(generalSchema.identifierSchema, listID);
		validate(generalSchema.identifierSchema, id);
		const list = await List.findByIdAndUpdate(listID, { $pull: { items: { _id: id } } }).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};
