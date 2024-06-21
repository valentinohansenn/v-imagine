"use client"

import React, { useTransition } from "react"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteImage } from "@/lib/actions/image.actions"

const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
	const [isPending, startTransition] = useTransition()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild className="w-full rounded-full">
				<Button
					type="button"
					variant="destructive"
					className="button h-[44px] w-full md:h-[54px]"
				>
					Delete Image
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col gap-10">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure that you want to permanently delete
						this image?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						image and remove your transformation from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="border bg-red-500 text-white hover:bg-red-600"
						onClick={() =>
							startTransition(async () => {
								await deleteImage(imageId)
							})
						}
					>
						{isPending ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteConfirmation
