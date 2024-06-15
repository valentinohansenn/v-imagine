"use client"

import React from "react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "../ui/use-toast"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { dataUrl, getImageSize } from "@/lib/utils"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"

export type MediaUploaderProps = {
	onValueChange: (value: string) => void
	setImage: (image: React.Dispatch<any>) => void
	publicId: string
	image: any
	type: string
}

const MediaUploader = ({
	onValueChange,
	setImage,
	publicId,
	image,
	type,
}: MediaUploaderProps) => {
	const { toast } = useToast()

	const onUploadSuccessHandler = (result: any) => {
		setImage((prev) => ({
			...prev,
			publicId: result?.info.public_id,
			width: result?.info.width,
			height: result?.info.height,
			secureURL: result?.info.secure_url,
		}))

		onValueChange(result?.info.public_id)

		toast({
			title: "Image has been uploaded successfully...",
			description: "1 token was deducted from your usage!",
			duration: 5000,
			className: "success-toast",
		})
	}

	const onUploadErrorHandler = (result: any) => {
		toast({
			title: "Something went wrong...",
			description: "Please try again...",
			duration: 5000,
			className: "error-toast",
		})
	}

	return (
		<CldUploadWidget
			uploadPreset="v-imagine"
			options={{
				multiple: false,
				resourceType: "image",
			}}
			onSuccess={onUploadSuccessHandler}
			onError={onUploadErrorHandler}
		>
			{({ open }) => (
				<div className="flex flex-col gap-4">
					<h3 className="h3-bold text-black">Original</h3>
					{publicId ? (
						<div className="overflow-hidden rounded-[10px] cursor-pointer">
							<CldImage
								width={getImageSize(type, image?.width, "width")}
								height={getImageSize(type, image?.height, "height")}
								src={publicId}
								alt="image"
								sizes={"(max-width: 768px) 100vw, 50vw"}
								placeholder={dataUrl as PlaceholderValue}
								className="media-uploader_cldImage"
							/>
						</div>
					) : (
						<div className="media-uploader_cta" onClick={() => open()}>
							<div className="media-uploader_cta-image">
								<Image
									src="/assets/icons/add.svg"
									alt="addImage"
									width={24}
									height={24}
								/>
							</div>
							<p className="p-14-medium">Click Here to Upload Image</p>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	)
}

export default MediaUploader
