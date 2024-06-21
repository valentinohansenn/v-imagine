import { Schema, model, models } from "mongoose"

const TransactionSchema = new Schema({
	stripeId: { type: String, required: true, unique: true },
	amount: { type: Number, required: true },
	plan: { type: String },
	tokens: { type: Number },
	buyerId: { type: Schema.Types.ObjectId, ref: "User" },
})

const Transaction =
	models?.Transaction || model("Transaction", TransactionSchema)

export default Transaction
