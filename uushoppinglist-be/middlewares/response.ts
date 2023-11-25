import { Request, Response, NextFunction } from 'express';

const ResponseHandler = (result: any, req: Request, res: Response, next: NextFunction) => {
	if (result.type === 'error') {
		next(result);
		return;
	}
	res.json({
		success: true,
		result: result.data ?? result,
		errors: result.errors ?? null,
	});
};

export default ResponseHandler;
