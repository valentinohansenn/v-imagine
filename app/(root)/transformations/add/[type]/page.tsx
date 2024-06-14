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

	return (
		<>
			<Header
				title={transformation.title}
				subtitle={transformation.subTitle}
			/>
			{/* <TransformationForm
				action="Add"
				userId={user._id}
				type={transformation.type as TransformationTypeKey}
				tokenBalance={user.tokenBalance}
			/> */}
		</>
	)
}

export default AddTransformationTypePage
