import mongoose, { Schema } from 'mongoose';

type List = {
	name: string;
	ownerID: string;
	membersIDs: Array<string>;
	archived: boolean;
	items: Array<ListItem>;
	createdAt: Date;
	updatedAt: Date;
};
type ListItem = { id: string; name: string; checked: boolean };

const ListSchema = new mongoose.Schema<List>(
	{
		name: {
			type: String,
			required: true,
		},
		ownerID: {
			type: String,
			required: true,
			unique: true,
		},
		membersIDs: {
			type: [String],
			required: true,
		},
		archived: {
			type: Boolean,
			required: true,
		},
		items: {
			type: [{ id: String, name: String, checked: Boolean }],
			required: true,
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);
export default mongoose.model('ShoppingList', ListSchema);
