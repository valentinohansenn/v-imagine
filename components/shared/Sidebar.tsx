import Image from "next/image"
import Link from "next/link"
import React from "react"

const Sidebar = () => {
	return (
		<aside className="sidebar">
			<div className="flex size-full flex-col gap-4">
				<Link href="/" className="sidebar-logo">
					<Image
						src="/assets/images/main-logo.png"
						alt="logo"
						width={180}
						height={280}
					/>
				</Link>
			</div>
		</aside>
	)
}

export default Sidebar
