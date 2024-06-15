"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const InsufficientTokensModal = () => {
	const router = useRouter()

	return (
		<AlertDialog defaultOpen>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex-between">
						<p className="p-16-semibold text-black">
							Insufficient Tokens!
						</p>
						<AlertDialogCancel
							className="border-0 p-0 hover:bg-transparent"
							onClick={() => router.push("/profile")}
						>
							<Image
								src="/assets/icons/close.svg"
								alt="credit coins"
								width={24}
								height={24}
								className="cursor-pointer"
							/>
						</AlertDialogCancel>
					</div>

					<Image
						src="/assets/images/stacked-coins.png"
						alt="credit coins"
						width={452}
						height={202}
					/>

					<AlertDialogTitle className="p-24-bold text-black">
						Unfortunately! The transformation can't be done due to
						insufficient tokens...
					</AlertDialogTitle>

					<AlertDialogDescription className="p-16-regular py-3">
						You can purchase more tokens to proceed with the
						transformation.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						className="button w-full text-gray-400"
						onClick={() => router.push("/profile")}
					>
						Go Back to my Profile
					</AlertDialogCancel>
					<AlertDialogAction
						className="button w-full bg-black bg-cover"
						onClick={() => router.push("/tokens")}
					>
						Yes, Proceed
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
