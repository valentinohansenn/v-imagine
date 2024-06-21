import { createTransaction } from "@/lib/actions/transaction.action"
import { NextResponse } from "next/server"
import stripe from "stripe"

export async function POST(request: Request) {
	const body = await request.text()

	const sig = request.headers.get("stripe-signature") as string
	const endpoint = process.env.STRIPE_WEBHOOK_SECRET!

	let event

	try {
		event = stripe.webhooks.constructEvent(body, sig, endpoint)
	} catch (err) {
		return new Response("Webhook Error", { status: 400 })
	}

	// Get the ID and Type
	const eventType = event.type

	// CREATE
	if (eventType === "checkout.session.completed") {
		const { id, amount_total, metadata } = event.data.object

		const transaction = {
			stripeId: id,
			amount: amount_total ? amount_total / 100 : 0,
			plan: metadata?.plan || "",
			tokens: Number(metadata?.tokens) || 0,
			buyerId: metadata?.buyerId || "",
			createdAt: new Date(),
		}

		const newTransaction = await createTransaction(transaction)
		return NextResponse.json({ message: "OK", transaction: newTransaction })
	}
	return new Response("", { status: 200 })
}
