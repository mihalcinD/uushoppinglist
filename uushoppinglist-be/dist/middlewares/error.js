"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong :(';
    res.status(status).json({
        success: false,
        status,
        reason: message,
        stack: process.env.NODE_ENV !== 'development' ? {} : err.stack,
    });
};
exports.default = ErrorHandler;
