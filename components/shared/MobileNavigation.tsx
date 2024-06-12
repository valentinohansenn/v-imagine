"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet"
import { navigationLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const MobileNavigation = () => {
	const pathname = usePathname()
	return (
		<header className="header">
			<SignedIn>
				<Sheet key="left">
					<SheetTrigger>
						<Image
							src="/assets/icons/menu.svg"
							alt="logo"
							height={28}
							width={28}
						/>
					</SheetTrigger>
					<SheetContent side="left" className="sheet-content sm:w-64">
						<>
							<Image
								src="/assets/images/main-logo.png"
								alt="logo"
								width={132}
								height={23}
							/>
							<ul className="header-nav_elements">
								{navigationLinks.map((link) => {
									const isActive = link.route === pathname

									return (
										<li
											key={link.route}
											className={`header-nav_element group ${
												isActive
													? "bg-black text-white hover:bg-black"
													: "text-gray-700"
											} p-18 flex whitespace-nowrap text-dark-700
                                 }`}
										>
											<Link
												className="sidebar-link cursor-pointer"
												href={link.route}
											>
												<Image
													src={link.icon}
													height={24}
													width={24}
													alt="icon"
												/>
												{link.label}
											</Link>
										</li>
									)
								})}
							</ul>
						</>
					</SheetContent>
				</Sheet>
			</SignedIn>

			<SignedOut>
				<Button asChild className="button bg-cover">
					<Link href="/sign-in">Log In</Link>
				</Button>
			</SignedOut>
			<Link href="/" className="flex items-center gap-2 md:py-2">
				<Image
					src="/assets/images/mobile-logo.png"
					alt="logo"
					width={28}
					height={28}
				/>
				<Image
					src="/assets/images/wordmark-logo.png"
					alt="logo"
					width={100}
					height={28}
				/>
			</Link>

			<nav className="flex gap-2">
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</nav>
		</header>
	)
}

export default MobileNavigation
