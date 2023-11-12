import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { itemsSchema } from '../schemas/items.schema';
import { generalSchema } from '../schemas/general.schema';

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		validate(itemsSchema.createSchema, data);
		res.status(200).json({
			success: true,
			data: {
				input: data,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const patchItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const id = req.params.id;
		validate(generalSchema.identifierSchema, id);
		validate(itemsSchema.updateSchema, data);
		res.status(200).json({
			success: true,
			data: {
				input: data,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		validate(generalSchema.identifierSchema, id);
		res.status(204).json({});
	} catch (error) {
		next(error);
	}
};
