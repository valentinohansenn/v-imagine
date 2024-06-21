"use server"

import { redirect } from "next/navigation"
import Stripe from "stripe"
import { handleError } from "../utils"
import { connectToDatabase } from "../database/mongoose"
import Transaction from "../database/models/transaction.model"
import { updateTokens } from "./user.actions"

export async function checkoutTokens(transaction: CheckoutTransactionParams) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

	const amount = Number(transaction.amount) * 100 // Stripe process transaction as cents

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "aud",
					unit_amount: amount,
					product_data: {
						name: transaction.plan,
					},
				},
				quantity: 1,
			},
		],
		metadata: {
			plan: transaction.plan,
			tokens: transaction.tokens,
			buyerId: transaction.buyerId,
		},
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
		cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
	})

	redirect(session.url!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
	try {
		await connectToDatabase()
		// Create a new transaction with new buyerId
		const newTransaction = await Transaction.create({
			...transaction,
			buyer: transaction.buyerId,
		})

		await updateTokens(transaction.buyerId, transaction.tokens)
		return JSON.parse(JSON.stringify(newTransaction))
	} catch (error) {
		handleError(error)
	}
}
