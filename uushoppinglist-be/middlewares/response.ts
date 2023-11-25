import { Request, Response, NextFunction } from 'express';

const ResponseHandler = (result: any, req: Request, res: Response, next: NextFunction) => {
	if (result.type === 'error') {
		next(result);
	}
	res.json({
		success: true,
		result,
		errors: null,
	});
};

export default ResponseHandler;
