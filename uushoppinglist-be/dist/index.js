"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const error_1 = __importDefault(require("./middlewares/error"));
const routes_1 = require("./routes");
const Error_1 = require("./helpers/Error");
const mongoose_1 = __importDefault(require("mongoose"));
const response_1 = __importDefault(require("./middlewares/response"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to database');
}, err => {
    console.log('Error connecting to database: ', err);
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(jwtCheck);
app.use('/lists', routes_1.listRoute);
app.use('/lists/:listID/items', routes_1.itemsRoute);
app.use('/lists/:listID/members', routes_1.membersRoute);
app.use((req, res, next) => {
    next((0, Error_1.CreateError)('Not Found :(', 404));
});
app.use(response_1.default);
app.use(error_1.default);
app.listen(PORT, () => {
    console.log('Server running on port  ' + PORT);
});
exports.default = app;
//# sourceMappingURL=index.js.map