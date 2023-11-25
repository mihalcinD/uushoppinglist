import mongoose, { Schema } from 'mongoose';

type List = {
	name: string;
	ownerID: string;
	membersIDs: Array<string>;
	isArchived: boolean;
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
		},
		membersIDs: {
			type: [String],
			required: true,
		},
		isArchived: {
			type: Boolean,
			required: true,
		},
		items: {
			type: [
				{ id: Schema.Types.ObjectId, name: { type: String, required: true }, isDone: { type: Boolean, default: false } },
			],
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
