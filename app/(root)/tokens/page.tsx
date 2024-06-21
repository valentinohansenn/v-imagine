import Checkout from "@/components/shared/Checkout"
import Header from "@/components/shared/Header"
import { Button } from "@/components/ui/button"
import { plans } from "@/constants"
import { getUser } from "@/lib/actions/user.actions"
import { SignedIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import React from "react"

const Credit = async () => {
	const { userId } = auth()

	if (!userId) redirect("/sign-in")

	const user = await getUser(userId)
	return (
		<>
			<Header
				title="Buy Tokens"
				subtitle="Choose the token package that suits your usage!"
			/>

			<section>
				<ul className="credits-list">
					{plans.map((plan) => (
						<li key={plan.name} className="credits-item">
							<div className="flex-center flex-col gap-4">
								<Image
									src={plan.icon}
									alt="check"
									width={40}
									height={40}
								/>
								<p className="p-20-semibold text-black">{plan.name}</p>
								<p className="h1-semibold text-black">{plan.price}</p>
								<p className="p-16-regular">{plan.tokens} Tokens</p>
							</div>

							{/* Inclusions */}
							<ul className="flex flex-col gap-4 py-9">
								{plan.inclusions.map((inclusion) => (
									<li
										key={plan.name + inclusion.label}
										className="flex items-center gap-4"
									>
										<Image
											src={`/assets/icons/${
												inclusion.isIncluded
													? "check.svg"
													: "cross.svg"
											}`}
											alt="check"
											width={24}
											height={24}
										/>
										<p className="p-16-regular text-black">
											{inclusion.label}
										</p>
									</li>
								))}
							</ul>

							{plan.name === "Free" ? (
								<Button variant="outline" className="credits-btn">
									Free Consumable
								</Button>
							) : (
								<SignedIn>
									<Checkout
										plan={plan.name}
										amount={plan.price}
										tokens={plan.tokens}
										buyerId={user._id}
									/>
								</SignedIn>
							)}
						</li>
					))}
				</ul>
			</section>
		</>
	)
}

export default Credit
