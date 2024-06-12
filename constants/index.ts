export const navigationLinks = [
	{
		label: "Home",
		route: "/",
		icon: "/assets/icons/home.svg",
	},
	{
		label: "Restore Images",
		route: "/transformation/add/restore",
		icon: "/assets/icons/image.svg",
	},
	{
		label: "Generative Fill",
		route: "/transformation/add/fill",
		icon: "/assets/icons/stars.svg",
	},
	{
		label: "Remove Images",
		route: "/transformation/add/remove",
		icon: "/assets/icons/scan.svg",
	},
	{
		label: "Recolor Images",
		route: "/transformation/add/recolor",
		icon: "/assets/icons/filter.svg",
	},
	{
		label: "Remove Background",
		route: "/transformation/add/removeBackground",
		icon: "/assets/icons/camera.svg",
	},
	{
		label: "Profile",
		route: "/profile",
		icon: "/assets/icons/profile.svg",
	},
	{
		label: "Buy Tokens",
		route: "/tokens",
		icon: "/assets/icons/bag.svg",
	},
]

export const subscriptionPlan = [
	{
		id: "1",
		name: "Free",
		icon: "/assets/icons/free-plan.svg",
		price: 0,
		tokens: 20,
		inclusions: [
			{
				label: "20 Free Tokens",
				isIncluded: true,
			},
			{
				label: "Basic Access to Free Services",
				isIncluded: true,
			},
			{
				label: "Priority Updates",
				isIncluded: false,
			},
			{
				label: "Priority Customer Support",
				isIncluded: false,
			},
		],
	},
	{
		id: "2",
		name: "Plus",
		icon: "/assets/icons/free-plan.svg",
		price: 49,
		tokens: 120,
		inclusions: [
			{
				label: "120 Tokens",
				isIncluded: true,
			},
			{
				label: "Full Access to All Services",
				isIncluded: true,
			},
			{
				label: "Priority Updates",
				isIncluded: false,
			},
			{
				label: "Priority Customer Support",
				isIncluded: true,
			},
		],
	},
	{
		id: "3",
		name: "Pro",
		icon: "/assets/icons/free-plan.svg",
		price: 199,
		tokens: 2000,
		inclusions: [
			{
				label: "2000 Tokens",
				isIncluded: true,
			},
			{
				label: "Full Access to All Services",
				isIncluded: true,
			},
			{
				label: "Priority Updates",
				isIncluded: true,
			},
			{
				label: "Priority Customer Support",
				isIncluded: true,
			},
		],
	},
]

export const transformationTypes = {
	restore: {
		type: "restore",
		title: "Restore Image",
		subtitle: "Enhance image by removing noise and imperfections",
		config: { restore: true },
		icon: "images.svg",
	},
	fill: {
		type: "fill",
		title: "Generative Fill",
		subtitle: "Enhance image's dimension by utilizing AI Outpainting Image",
		config: { fillBackground: true },
		icon: "stars.svg",
	},
	remove: {
		type: "remove",
		title: "Remove Image",
		subtitle: "Eliminate unnecessary objects from image",
		config: { prompt: "", removeShadow: true, multiple: true },
		icon: "scan.svg",
	},
	recolor: {
		type: "restore",
		title: "Restore Image",
		subtitle: "Enhance image by removing noise and imperfections",
		config: { restore: true },
		icon: "images.svg",
	},
}
