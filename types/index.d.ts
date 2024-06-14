// Create User Params
declare type CreateUserParams = {
	clerkId: string
	email: string
	username: string
	firstName: string
	lastName: string
	photo: string
}

// Update User Params
declare type UpdateUserParams = {
	firstName: string
	lastName: string
	username: string
	photo: string
}

// Add Image Params
declare type AddImageParams = {
	image: {
		title: string
		publicId: string
		transformationType: string
		width: number
		height: number
		config: any
		secureURL: string
		transformationURL: string
		aspectRatio: string | undefined
		prompt: string | undefined
		color: string | undefined
	}
	userId: string
	path: string
}

// Update Image Params
declare type UpdateImageParams = {
	image: {
		_id: string
		title: string
		publicId: string
		transformationType: string
		width: number
		height: number
		config: any
		secureURL: string
		transformationURL: string
		aspectRatio: string | undefined
		prompt: string | undefined
		color: string | undefined
	}
	userId: string
	path: string
}

// Transformations
declare type Transformations = {
	restore?: boolean
	fillBackground?: boolean
	remove?: {
		prompt: string
		removeShadow?: boolean
		multiple?: boolean
	}
	recolor?: {
		prompt?: string
		to: string
		multiple?: string
	}
	removeBackground?: boolean
}

// Checkout Transaction Params
declare type CheckoutTransactionParams = {
	plan: string
	tokens: string
	amount: string
	buyerId: string
}

// Create Transaction Params
declare type CreateTransactionParams = {
	stripeId: string
	plan: string
	tokens: string
	amount: string
	buyerId: string
	createdAt: Date
}

// Declare Transformation Type Key
declare type TransformationTypeKey =
	| "restore"
	| "fill"
	| "remove"
	| "recolor"
	| "removeBackground"

// ===== URL Query Params =====
declare type FormUrlQueryParams = {
	searchParams: URLSearchParams
	key: string
	value: string | number | null
}

declare type UrlQueryParams = {
	params: string
	key: string
	value: string | null
}

declare type RemoveUrlQueryParams = {
	searchParams: string
	keysToRemove: string[]
}

declare type SearchParamsProps = {
	params: { id: string; type: TransformationTypeKey }
	searchParams: { [key: string]: string | string[] | undefined }
}

declare type TransformationFormProps = {
	action: "Add" | "Update"
	userId: string
	type: TransformationTypeKey
	creditBalance: number
	data?: ImageInterface | null
	config?: Transformations | null
}

declare type TransformedImageProps = {
	image: any
	type: string
	title: string
	transformationConfig: Transformations | null
	isTransforming: boolean
	hasDownload?: boolean
	setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>
}
