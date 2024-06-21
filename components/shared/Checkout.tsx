"use client"

import React, { useEffect } from "react"
import { Button } from "../ui/button"
import { checkoutTokens } from "@/lib/actions/transaction.action"
import { useToast } from "../ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"

const Checkout = ({
	plan,
	amount,
	tokens,
	buyerId,
}: {
	plan: string
	amount: number
	tokens: number
	buyerId: string
}) => {
	const { toast } = useToast()

	useEffect(() => {
		loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
	}, [])

	useEffect(() => {
		// Check to see if this is a redirect from Checkout
		const query = new URLSearchParams(window.location.search)
		if (query.get("success")) {
			toast({
				title: "Order placed successfully!",
				description: "You will receive an email confirmation shortly.",
				duration: 5000,
				className: "success-toast",
			})
		}

		if (query.get("canceled")) {
			toast({
				title: "Order canceled",
				description: "Continue to shop around and checkout when ready!.",
				duration: 5000,
				className: "error-toast",
			})
		}
	}, [])

	const onCheckout = async () => {
		const transaction = {
			plan,
			amount,
			tokens,
			buyerId,
		}

		await checkoutTokens(transaction)
	}
	return (
		<form action={onCheckout} method="POST">
			<section>
				<Button
					type="submit"
					role="link"
					className="w-full rounded-full bg-cover"
				>
					Buy Credit
				</Button>
			</section>
		</form>
	)
}

export default Checkout
