import { NextFunction, Request, Response } from 'express';
import { CreateError } from '../helpers/Error';
import { Profiles } from '../types/enums/profiles';

export const restrict = (roles: Array<Profiles>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (roles.includes(Profiles.MEMBER)) {
			throw CreateError('You are not authorized to access this endpoint', 403);
		}

		next();
	};
};
