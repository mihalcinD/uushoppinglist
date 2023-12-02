"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler = (result, req, res, next) => {
    var _a, _b;
    if (result.type === 'error') {
        next(result);
        return;
    }
    res.json({
        success: true,
        result: (_a = result.data) !== null && _a !== void 0 ? _a : result,
        errors: (_b = result.errors) !== null && _b !== void 0 ? _b : null,
    });
};
exports.default = ResponseHandler;
//# sourceMappingURL=response.js.map