import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { generalSchema } from '../schemas/general.schema';
import { listsSchema } from '../schemas/lists.schema';

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
	try {
		next({ working: true });
	} catch (error) {
		next(error);
	}
};

export const getList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);

		next([id]);
	} catch (error) {
		next(error);
	}
};

export const createList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		validate(listsSchema.createSchema, data);

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

export const patchList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);
		validate(listsSchema.updateSchema, data);
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

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.listID;
		validate(generalSchema.identifierSchema, id);
		res.status(204);
		next({});
	} catch (error) {
		next(error);
	}
};
