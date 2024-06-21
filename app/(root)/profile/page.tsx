import Collection from "@/components/shared/Collection"
import Header from "@/components/shared/Header"
import { getImagesByUser } from "@/lib/actions/image.actions"
import { getUser } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"
import React from "react"

const Profile = async ({ searchParams }: SearchParamsProps) => {
	const page = Number(searchParams?.page) || 1
	const { userId } = auth()

	if (!userId) redirect("/sign-in")

	const user = await getUser(userId)
	const images = await getImagesByUser({ page, userId: user._id })
	return (
		<>
			<Header title="Profile" />

			<section className="profile">
				<div className="profile-balance">
					<p className="p-14-medium md:p-16-medium text-black">
						Credits Available
					</p>
					<div className="mt-4 flex items-center gap-4">
						<Image
							src="/assets/icons/coins.svg"
							alt="coins"
							width={50}
							height={50}
							className="size-9 md:size-12"
						/>
						<h2 className="h2-bold text-black font-bold">
							{user.tokenBalance}
						</h2>
					</div>
				</div>

				<div className="profile-image-manipulation">
					<p className="p-14-medium md:p-16-medium text-black">
						Image Transformation Done
					</p>
					<div className="mt-4 flex items-center gap-4">
						<Image
							src="/assets/icons/photo.svg"
							alt="photo"
							width={50}
							height={50}
						/>
						<h2 className="h2-bold text-black">{images?.data.length}</h2>
					</div>
				</div>
			</section>

			<section className="mt-8 md:mt-14">
				<Collection
					images={images?.data}
					totalPages={images?.totalPages}
					page={page}
				/>
			</section>
		</>
	)
}

export default Profile
