"use client"

import React, { useState } from "react"
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
	transformationTypes,
} from "@/constants"
import { CustomField } from "./CustomField"
import { AspectRatioKey } from "@/lib/utils"

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
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
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
		console.log({ transformationType })
		// setNewTransformation(transformationType.config)
		return onChangeField(value)
	}

	const onInputChangeHandler = (
		field: string,
		value: string,
		type: string,
		onChangeField: (value: string) => void
	) => {}

	const onTransformHandler = () => {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
