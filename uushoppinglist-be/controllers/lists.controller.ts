import { NextFunction, Request, Response } from 'express';

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//get lists
		res.status(200).json({
			success: true,
			data: 'getLists',
		});
	} catch (error) {
		next(error);
	}
};

export const getList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//get list
		res.status(200).json({
			success: true,
			data: 'getList',
		});
	} catch (error) {
		next(error);
	}
};

export const createList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//create list
		res.status(200).json({
			success: true,
			data: 'createList',
		});
	} catch (error) {
		next(error);
	}
};

export const patchList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//patch list
		res.status(200).json({
			success: true,
			data: 'patchList',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//delete list
		res.status(200).json({
			success: true,
			data: 'deleteList',
		});
	} catch (error) {
		next(error);
	}
};
