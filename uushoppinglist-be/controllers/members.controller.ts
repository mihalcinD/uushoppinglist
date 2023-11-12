import { NextFunction, Request, Response } from 'express';

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//add member
		res.status(200).json({
			success: true,
			data: 'addMember',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//delete member
		res.status(200).json({
			success: true,
			data: 'deleteMember',
		});
	} catch (error) {
		next(error);
	}
};
