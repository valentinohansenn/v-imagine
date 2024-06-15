"use client"

import React, { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
	aspectRatioOptions,
	defaultValues,
	tokenFee,
	transformationTypes,
} from "@/constants"
import { CustomField } from "./CustomField"
import {
	AspectRatioKey,
	debounce,
	deepMergeObjects,
	handleError,
} from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { useTokens } from "@/lib/actions/user.actions"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientTokensModal } from "./InsufficientTokensModal"

export const formSchema = z.object({
	title: z.string(),
	aspectRatio: z.string().optional(),
	color: z.string().optional(),
	prompt: z.string().optional(),
	publicId: z.string(),
})

const TransformationForm = ({
	action,
	userId,
	type,
	tokenBalance,
	data = null,
	config = null,
}: TransformationFormProps) => {
	const transformationType = transformationTypes[type]
	const [image, setImage] = useState(data)
	const [newTransformation, setNewTransformation] =
		useState<Transformations | null>(null)

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isTransforming, setIsTransforming] = useState(false)
	const [transformationConfig, setTransformationConfig] = useState(config)
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const initialValues =
		data && action === "Update"
			? {
					title: data?.title,
					aspectRatio: data?.aspectRatio,
					color: data?.color,
					prompt: data?.prompt,
					publicId: data?.publicId,
			  }
			: defaultValues
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues,
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true)

		if (data || image) {
			const transformationUrl = getCldImageUrl({
				height: image?.height,
				width: image?.width,
				src: image?.publicId,
				...transformationConfig,
			})

			const imageData = {
				title: values.title,
				publicId: image?.publicId,
				transformationType: type,
				width: image?.width,
				height: image?.height,
				config: transformationConfig,
				secureURL: image?.secureURL,
				transformationURL: transformationUrl,
				aspectRatio: values.aspectRatio,
				prompt: values.prompt,
				color: values.color,
			}

			if (action === "Add") {
				try {
					const newImage = await addImage({
						image: imageData,
						userId,
						path: "/",
					})

					if (newImage) {
						form.reset()
						setImage(data)
						router.push(`/transformations/${newImage._id}`)
					}
				} catch (error) {
					handleError(error)
				}
			}

			if (action === "Update") {
				try {
					const updatedImage = await updateImage({
						image: {
							...imageData,
							_id: data._id,
						},
						userId,
						path: `/transformations/${data._id}`,
					})

					if (updatedImage) {
						router.push(`/transformations/${updatedImage._id}`)
					}
				} catch (error) {
					handleError(error)
				}

				setIsSubmitting(false)
			}
		}
	}

	const onSelectFieldHandler = (
		value: string,
		onChangeField: (value: string) => void
	) => {
		const imageSize = aspectRatioOptions[value as AspectRatioKey]
		setImage((prev: any) => ({
			...prev,
			aspectRatio: imageSize.aspectRatio,
			width: imageSize.width,
			height: imageSize.height,
		}))

		setNewTransformation(transformationType.config)
		return onChangeField(value)
	}

	const onInputChangeHandler = (
		field: string,
		value: string,
		type: string,
		onChangeField: (value: string) => void
	) => {
		debounce(() => {
			setNewTransformation((prev: any) => ({
				...prev,
				[type]: {
					...prev?.[type],
					[field === "prompt" ? "prompt" : "to"]: value,
				},
			}))
			return onChangeField(value)
		}, 1000)
	}

	// TODO: Return to updateTokens
	const onTransformHandler = async () => {
		setIsTransforming(true)

		setTransformationConfig(
			deepMergeObjects(newTransformation, transformationConfig)
		)

		setNewTransformation(null)
		startTransition(async () => {
			// await updateTokens( userId, tokenFee)
			await useTokens(userId, tokenFee)
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{tokenBalance < Math.abs(tokenFee) && <InsufficientTokensModal />}
				<CustomField
					control={form.control}
					render={({ field }) => (
						<Input
							{...field}
							className="input-field"
							type="text"
							placeholder="Title"
						/>
					)}
					name="title"
					formLabel="Image Title"
					className="w-full"
				/>
				{type === "fill" && (
					<CustomField
						control={form.control}
						name="aspectRatio"
						formLabel="Aspect Ratio"
						className="w-full"
						render={({ field }) => (
							<Select
								onValueChange={(value) => {
									onSelectFieldHandler(value, field.onChange)
								}}
							>
								<SelectTrigger className="select-field">
									<SelectValue placeholder="Select Size" />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(aspectRatioOptions).map((key) => {
										return (
											<SelectItem
												key={key}
												value={key}
												className="select-item"
											>
												{
													aspectRatioOptions[key as AspectRatioKey]
														.label
												}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
						)}
					/>
				)}

				{(type === "remove" || type === "recolor") && (
					<div>
						<CustomField
							control={form.control}
							name="prompt"
							formLabel={
								type === "remove"
									? "Object To Remove"
									: "Object To Recolor"
							}
							className="w-full"
							render={({ field }) => (
								<Input
									{...field}
									className="input-field"
									onChange={(e) => {
										onInputChangeHandler(
											"prompt",
											e.target.value,
											type,
											field.onChange
										)
									}}
									type="text"
									placeholder="Prompt"
								/>
							)}
						/>

						{type === "recolor" && (
							<CustomField
								control={form.control}
								name="color"
								formLabel="Replacement Color"
								className="w-full"
								render={({ field }) => (
									<Input
										{...field}
										className="input-field"
										onChange={(e) => {
											onInputChangeHandler(
												"color",
												e.target.value,
												"recolor",
												field.onChange
											)
										}}
										type="text"
										placeholder="Color"
									/>
								)}
							/>
						)}
					</div>
				)}
				<div className="media-uploader-field">
					<CustomField
						control={form.control}
						name="publicId"
						formLabel=""
						className="flex size-full flex-col"
						render={({ field }) => (
							<MediaUploader
								onValueChange={field.onChange}
								setImage={setImage}
								publicId={field.value}
								image={image}
								type={type}
							/>
						)}
					/>

					<TransformedImage
						image={image}
						type={type}
						title={form.getValues("title")}
						isTransforming={isTransforming}
						setIsTransforming={setIsTransforming}
						transformationConfig={transformationConfig}
					/>
				</div>

				<div className="flex flex-col gap-4">
					<Button
						type="submit"
						className="submit-button capitalize"
						disabled={isTransforming || newTransformation === null}
						onClick={onTransformHandler}
					>
						{isTransforming ? "Transforming..." : "Apply Transformation"}
					</Button>
					<Button
						type="submit"
						className="submit-button capitalize"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Save Image"}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default TransformationForm
