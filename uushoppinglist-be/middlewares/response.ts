import { Request, Response, NextFunction } from 'express';

const ResponseHandler = (result: any, req: Request, res: Response, next: NextFunction) => {
	if (result.type === 'error') {
		next(result);
		return;
	}
	res.json({
		success: true,
		result,
		errors: null,
	});
};

export default ResponseHandler;
