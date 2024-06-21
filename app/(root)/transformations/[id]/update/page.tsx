import Header from "@/components/shared/Header"
import TransformationForm from "@/components/shared/TransformationForm"
import { transformationTypes } from "@/constants"
import { getImage } from "@/lib/actions/image.actions"
import { getUser } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

const UpdateTransformationPage = async ({
	params: { id },
}: SearchParamsProps) => {
	const { userId } = auth()

	if (!userId) redirect("/sign-in")

	const user = await getUser(userId)
	const image = await getImage(id)

	const transformation =
		transformationTypes[image.transformationType as TransformationTypeKey]

	return (
		<>
			<Header
				title={transformation.title}
				subtitle={transformation.subtitle}
			/>

			<section className="mt-10">
				<TransformationForm
					action="Update"
					userId={user._id}
					type={image.transformationType}
					tokenBalance={user.tokens}
					data={image}
					config={image.config}
				/>
			</section>
		</>
	)
}

export default UpdateTransformationPage
