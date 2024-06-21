import DeleteConfirmation from "@/components/shared/DeleteConfirmation"
import Header from "@/components/shared/Header"
import TransformedPage from "@/components/shared/TransformedPage"
import { Button } from "@/components/ui/button"
import { getImage } from "@/lib/actions/image.actions"
import { getImageSize } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import React from "react"

const ImagePage = async ({ params: { id } }: SearchParamsProps) => {
	const { userId } = auth()
	const image = await getImage(id)

	return (
		<>
			<Header title={image.title} />

			<section className="mt-5 flex flex-wrap gap-4">
				<div className="p-14-medium md:p-16-medium flex gap-2">
					<p className="text-dark-600">Transformation:</p>
					<p className="capitalize">{image.transformationType}</p>
				</div>

				{image.prompt && (
					<>
						<p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
						<div className="p-14-medium md:p-16-medium flex gap-2">
							<p className="text-dark-600">Prompt:</p>
							<p className="capitalize">{image.prompt}</p>
						</div>
					</>
				)}

				{image.color && (
					<>
						<p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
						<div className="p-14-medium md:p-16-medium flex gap-2">
							<p className="text-dark-600">Color:</p>
							<p className=" capitalize">{image.color}</p>
						</div>
					</>
				)}

				{image.aspectRatio && (
					<>
						<p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
						<div className="p-14-medium md:p-16-medium flex gap-2">
							<p className="text-dark-600">Aspect Ratio:</p>
							<p className=" capitalize">{image.aspectRatio}</p>
						</div>
					</>
				)}
			</section>

			<section className="mt-10 border-t border-dark-400/15">
				<div className="transformation-grid">
					<div className="flex flex-col gap-4">
						<h3 className="h3-bold text-black">Original</h3>

						<Image
							src={image.secureURL}
							alt="image"
							width={getImageSize(
								image.transformationType,
								image,
								"width"
							)}
							height={getImageSize(
								image.transformationType,
								image,
								"height"
							)}
							className="transformation-original_image"
						/>
					</div>

					<TransformedPage
						image={image}
						type={image.transformationType}
						title={image.title}
						isTransforming={false}
						transformationConfig={image.config}
						hasDownload={true}
					/>
				</div>

				{image.author.clerkId === userId && (
					<div className="mt-4 space-y-4">
						<Button type="button" className="submit-button capitalize">
							Update Image
						</Button>

						<DeleteConfirmation imageId={image._id} />
					</div>
				)}
			</section>
		</>
	)
}

export default ImagePage
