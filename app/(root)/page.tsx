import Collection from "@/components/shared/Collection"
import { SparklesCore } from "@/components/ui/sparkles"
import { navigationLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamsProps) => {
	const page = Number(searchParams?.page) || 1
	const searchQuery = (searchParams?.query as string) || ""

	const images = await getAllImages({ page, searchQuery })

	return (
		<>
			<section className="w-full bg-black sm:flex-center flex-col items-center justify-center overflow-hidden rounded-[20px] h-[800px] md:h-[700px] lg:h-[600px] hidden">
				<h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 max-w-[500px] shadow-sm">
					Imagine.
				</h1>
				<div className="w-[40rem] h-40 relative">
					{/* Gradients */}
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

					{/* Core component */}
					<SparklesCore
						background="transparent"
						minSize={0.4}
						maxSize={1}
						particleDensity={1200}
						className="w-full h-full z-0"
						particleColor="#FFFFFF"
					/>

					<ul className="flex-center w-full px-4 gap-10 md:gap-15 lg:gap-20 cursor-pointer">
						{navigationLinks.slice(1, 5).map((link) => (
							<Link
								key={link.route}
								href={link.route}
								className="flex-center flex-col gap-4"
							>
								<li className="flex-center w-fit rounded-full bg-white p-4">
									<Image
										src={link.icon}
										alt="image"
										width={24}
										height={24}
									/>
								</li>
								<p className="p-14-medium text-center text-white font-bold">
									{link.label}
								</p>
							</Link>
						))}
					</ul>

					{/* Radial Gradient to prevent sharp edges */}
					<div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
				</div>
			</section>

			<section className="sm:mt-12">
				<Collection
					hasSearch={true}
					images={images?.data}
					totalPages={images?.totalPage}
					page={page}
				/>
			</section>
		</>
	)
}

export default Home
