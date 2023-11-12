import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { membersSchema } from '../schemas/members.schema';
import { generalSchema } from '../schemas/general.schema';

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		validate(membersSchema.addSchema, data);
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

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		validate(generalSchema.identifierSchema, id);
		res.status(204).json({});
	} catch (error) {
		next(error);
	}
};
