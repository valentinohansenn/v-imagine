import React from "react"

const Header = ({ title, subtitle }: { title: String; subtitle?: String }) => {
	return (
		<>
			<h2 className="h2-bold text-dark-600">{title}</h2>
			{subtitle && <p className="text-dark-400">{subtitle}</p>}
		</>
	)
}

export default Header
