import React from "react"

const Header = ({ title, subtitle }: { title: String; subtitle?: String }) => {
	return (
		<>
			<h2 className="h2-bold text-black">{title}</h2>
			{subtitle && <p className="text-gray-400">{subtitle}</p>}
		</>
	)
}

export default Header
