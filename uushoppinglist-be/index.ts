import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import ErrorHandler from './middlewares/error';
import { itemsRoute, listRoute, membersRoute } from './routes';
import { CreateError } from './helpers/Error';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string).then(
	() => {
		console.log('Connected to database');
	},
	err => {
		console.log('Error connecting to database: ', err);
	},
);

const app = express();
const PORT = process.env.PORT || 3000;

const jwtCheck = auth({
	audience: process.env.AUDIENCE,
	issuerBaseURL: process.env.ISSUER_BASE_URL,
	tokenSigningAlg: 'RS256',
});

app.use(cors());
app.use(express.json());
//uncomment next line to enable oauth authentication
//app.use(jwtCheck);

app.use('/lists', listRoute);
app.use('/lists/:listID/items', itemsRoute);
app.use('/lists/:listID/members', membersRoute);
app.use((req, res, next) => {
	next(CreateError('Not Found :(', 404));
});

app.use(ErrorHandler);

app.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});
