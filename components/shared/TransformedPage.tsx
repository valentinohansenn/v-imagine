"use client"

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import React from "react"
import { Button } from "../ui/button"
import Image from "next/image"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"

const TransformedPage = ({
	image,
	type,
	title,
	transformationConfig,
	isTransforming,
	setIsTransforming,
	hasDownload = false,
}: TransformedImageProps) => {
	const downloadHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		download(
			getCldImageUrl({
				src: image?.publicId,
				height: image?.height,
				width: image?.width,
				...transformationConfig,
			}),
			title
		)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex-between">
				<h3 className="h3-bold text-black">Transformed</h3>

				{hasDownload && (
					<Button
						className="download-btn bg-transparent hover:bg-transparent"
						onClick={downloadHandler}
					>
						<Image
							src="/assets/icons/download.svg"
							alt="download"
							width={24}
							height={24}
						/>
					</Button>
				)}
			</div>

			{image?.publicId && transformationConfig ? (
				<div className="relative">
					<CldImage
						src={image?.publicId}
						alt={title}
						width={getImageSize(type, image, "width")}
						height={getImageSize(type, image, "height")}
						placeholder={dataUrl as PlaceholderValue}
						className="transformed-image"
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
						onLoad={() => {
							setIsTransforming && setIsTransforming(false)
						}}
						onError={() => {
							debounce(() => {
								setIsTransforming && setIsTransforming(false)
							}, 8000)()
						}}
					/>

					{isTransforming && (
						<div className="transforming-loader">
							<Image
								src="/assets/icons/spinner.svg"
								width={50}
								height={50}
								alt="spinner"
							/>
							<p className="text-white/80">Please wait...</p>
						</div>
					)}
				</div>
			) : (
				<div className="transformed-placeholder">Transformed Image</div>
			)}
		</div>
	)
}

export default TransformedPage
