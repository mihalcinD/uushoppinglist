import { NextFunction, Request, Response } from 'express';

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//create item
		res.status(200).json({
			success: true,
			data: 'createItem',
		});
	} catch (error) {
		next(error);
	}
};

export const patchItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//patch item
		res.status(200).json({
			success: true,
			data: 'patchItem',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//patch item
		res.status(204).json({
			success: true,
			data: 'deleteItem',
		});
	} catch (error) {
		next(error);
	}
};
