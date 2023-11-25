import { NextFunction, Request, Response } from 'express';
import { CreateError } from '../helpers/Error';
import { Profiles } from '../types/enums/profiles';
import { getUserInfo, isAuthorized } from '../helpers/profile';

export const restrict = (profiles: Array<Profiles>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//comment next 2 lines to enable authorization
		// next();
		// return;

		const listID = req.params.listID;

		const authorized = await isAuthorized(req.auth?.payload.sub, listID, profiles);
		if (!authorized) next(CreateError('User is not authorized to access this endpoint.', 403));
		next();
	};
};
