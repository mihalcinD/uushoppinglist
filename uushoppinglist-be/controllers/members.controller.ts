import { NextFunction, Request, Response } from 'express';
import { validate } from '../helpers/validator';
import { membersSchema } from '../schemas/members.schema';
import { generalSchema } from '../schemas/general.schema';
import { CreateError } from '../helpers/Error';
import List from '../models/list.model';

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = req.body;
		const listID = req.params.listID;
		validate(generalSchema.identifierSchema, listID);
		validate(membersSchema.addSchema, data);
		const list = await List.findByIdAndUpdate(
			listID,
			{ $push: { membersIDs: data.memberID } },
			{ returnDocument: 'after' },
		).catch(err => {
			throw CreateError(err, 500);
		});
		next(list);
	} catch (error) {
		next(error);
	}
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const listID = req.params.listID;
		validate(generalSchema.identifierSchema, listID);
		validate(generalSchema.identifierSchema, id);
		await List.findByIdAndUpdate(listID, { $pull: { membersIDs: id } }).catch(err => {
			throw CreateError(err, 500);
		});
		res.status(204);
		next({});
	} catch (error) {
		next(error);
	}
};
