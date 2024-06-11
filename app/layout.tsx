import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ClerkProvider } from "@clerk/nextjs"

const IBMPlex = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ibn-plex",
})

export const metadata: Metadata = {
	title: "Imagine",
	description: "AI-Powered Image Generator",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
