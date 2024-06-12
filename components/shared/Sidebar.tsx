"use client"

import { navigationLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Button } from "../ui/button"

const Sidebar = () => {
	const pathname = usePathname()
	return (
		<aside className="sidebar">
			<div className="flex size-full flex-col gap-4">
				<Link href="/" className="sidebar-logo">
					<Image
						src="/assets/images/main-logo.png"
						alt="logo"
						width={180}
						height={28}
					/>
				</Link>

				<nav className="sidebar-nav">
					<SignedIn>
						<ul className="sidebar-nav_elements">
							{navigationLinks.map((link) => {
								const isActive = link.route === pathname

								return (
									<li
										key={link.route}
										className={`sidebar-nav_element group ${
											isActive
												? "bg-black text-white"
												: "text-gray-700"
										}`}
									>
										<Link className="sidebar-link" href={link.route}>
											<Image
												src={link.icon}
												height={24}
												width={24}
												alt="icon"
												className={`${
													isActive && "brightness-200"
												}`}
											/>
											{link.label}
										</Link>
									</li>
								)
							})}
							<li className="sidebar-link flex-center cursor-pointer">
								<UserButton afterSignOutUrl="/" showName />
							</li>
						</ul>
					</SignedIn>

					<SignedOut>
						<Button asChild className="button bg-cover">
							<Link href="/sign-in">Log In</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</aside>
	)
}

export default Sidebar
