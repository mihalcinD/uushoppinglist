import { NextFunction, Request, Response } from 'express';
import { CreateError } from '../helpers/Error';
import { Profiles } from '../types/enums/profiles';
import { getUserInfo, isAuthorized } from '../helpers/profile';

export const restrict = (profiles: Array<Profiles>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//comment next 2 lines to enable authorization
		next();
		return;

		const user = await getUserInfo(req);
		const listID = req.params.listID;
		if (user) {
			//@ts-ignore
			const userID = user.sub;
			if (!isAuthorized(userID, listID, profiles))
				next(CreateError('User is not authorized to access this endpoint.', 403));
		} else {
			next(CreateError('User Authorization was not successful.', 403));
		}
		next();
	};
};
