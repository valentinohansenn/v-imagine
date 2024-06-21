"use client"

import { ImageInterface } from "@/lib/database/models/image.model"
import React from "react"

import {
	Pagination,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"

import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CldImage } from "next-cloudinary"
import { transformationTypes } from "@/constants"
import Image from "next/image"
import { Search } from "@/components/shared/Search"
import { SignedIn } from "@clerk/nextjs"

const Collection = ({
	hasSearch = false,
	images,
	totalPages = 1,
	page,
}: {
	hasSearch?: boolean
	images: ImageInterface[]
	totalPages?: number
	page: number
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onPageChange = (action: string) => {
		const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1

		const newUrl = formUrlQuery({
			searchParams: searchParams.toString(),
			key: "page",
			value: pageValue,
		})

		router.push(newUrl, { scroll: false })
	}

	return (
		<>
			<SignedIn>
				<div className="collection-heading">
					<h2 className="h2-bold text-black">Recent Edits</h2>
					{hasSearch && <Search />}
				</div>

				{images.length > 0 ? (
					<ul className="collection-list">
						{images.map((image) => {
							// @ts-ignore
							return <Card key={image._id} image={image} />
						})}
					</ul>
				) : (
					<div className="collection-empty">
						<p className="p-20-semibold">Empty Images Transformation</p>
					</div>
				)}

				{totalPages > 1 && (
					<Pagination className="mt-10">
						<PaginationContent className="flex w-full">
							<Button
								disabled={Number(page) <= 1}
								className="collection-btn"
								onClick={() => onPageChange("prev")}
							>
								<PaginationPrevious className="hover:bg-transparent hover:text-white" />
							</Button>

							<p className="flex-center p-16-medium w-fit flex-1">
								{page} / {totalPages}
							</p>

							<Button
								className="button w-32 bg-purple-gradient bg-cover text-white"
								onClick={() => onPageChange("next")}
								disabled={Number(page) >= totalPages}
							>
								<PaginationNext className="hover:bg-transparent hover:text-white" />
							</Button>
						</PaginationContent>
					</Pagination>
				)}
			</SignedIn>
		</>
	)
}

const Card = ({ image }: { image: ImageInterface }) => {
	return (
		<li>
			<Link
				href={`/transformations/${image._id}`}
				className="collection-card"
			>
				<CldImage
					src={image.publicId}
					alt={image.title}
					width={image.width}
					height={image.height}
					{...image.config}
					loading="lazy"
					className="h-52 w-full rounded-[10px] object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				/>
				<div className="flex-between">
					<p className="p-20-semibold mr-3 line-clamp-1 text-black">
						{image.title}
					</p>

					<Image
						src={`assets/icons/${
							transformationTypes[
								image.transformationType as TransformationTypeKey
							].icon
						}`}
						alt={image.title}
						width={24}
						height={24}
					/>
				</div>
			</Link>
		</li>
	)
}

export default Collection
