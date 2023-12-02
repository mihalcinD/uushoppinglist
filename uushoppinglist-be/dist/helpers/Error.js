"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
const CreateError = (reason, statusCode) => {
    const error = new Error();
    error.message = reason;
    error.statusCode = statusCode;
    error.type = 'error';
    return error;
};
exports.CreateError = CreateError;
