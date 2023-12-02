"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const Error_1 = require("./Error");
const validate = (schema, data) => {
    var _a;
    const valid = schema(data);
    if (!valid) {
        throw (0, Error_1.CreateError)((_a = schema.errors) !== null && _a !== void 0 ? _a : 'Wrong input data', 400);
    }
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map