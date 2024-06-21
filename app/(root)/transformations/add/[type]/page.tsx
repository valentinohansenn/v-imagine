import Header from "@/components/shared/Header"
import TransformationForm from "@/components/shared/TransformationForm"
import { transformationTypes } from "@/constants"
import { getUser } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

const AddTransformationTypePage = async ({
	params: { type },
}: SearchParamsProps) => {
	const { userId } = auth()
	const transformation = transformationTypes[type]

	if (!userId) redirect("/sign-in")
	const user = await getUser(userId)

	return (
		<>
			<Header
				title={transformation.title}
				subtitle={transformation.subtitle}
			/>
			<section className="mt-10">
				<TransformationForm
					action="Add"
					userId={user._id}
					type={transformation.type as TransformationTypeKey}
					tokenBalance={user.tokenBalance}
				/>
			</section>
		</>
	)
}

export default AddTransformationTypePage
