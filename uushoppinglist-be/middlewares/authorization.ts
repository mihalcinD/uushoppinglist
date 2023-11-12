import { NextFunction, Request, Response } from 'express';
import { CreateError } from '../helpers/Error';
import { Profiles } from '../types/enums/profiles';
import { getUserInfo, isAuthorized } from '../helpers/profile';

export const restrict = (profiles: Array<Profiles>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = await getUserInfo(req);
		const listID = req.params.listID;
		if (user) {
			const userID = user.sub;
			if (!isAuthorized(userID, listID, profiles))
				throw CreateError('User is not authorized to access this endpoint.', 403);
		} else {
			throw CreateError('User Authorization was not successful.', 403);
		}
		next();
	};
};
