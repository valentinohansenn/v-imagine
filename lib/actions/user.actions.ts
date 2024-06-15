"use server"

import { revalidatePath } from "next/cache"
import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

// CREATE API
export async function createUser(user: CreateUserParams) {
	try {
		await connectToDatabase()

		const newUser = await User.create(user)
		return JSON.parse(JSON.stringify(newUser))
	} catch (error) {
		handleError(error)
	}
}

// READ API
export async function getUser(userId: string) {
	try {
		await connectToDatabase()

		const user = await User.findOne({ clerkId: userId })

		if (!user) throw new Error("User not found.")

		return JSON.parse(JSON.stringify(user))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE API
export async function updateUser(userId: string, user: UpdateUserParams) {
	try {
		await connectToDatabase()

		const updatedUser = await User.findOneAndUpdate(
			{ clerkId: userId },
			user,
			{
				new: true,
			}
		)
		if (!updatedUser) throw new Error("User Update not successful.")

		return JSON.parse(JSON.stringify(updatedUser))
	} catch (error) {
		handleError(error)
	}
}

// DELETE API
export async function deleteUser(userId: string) {
	try {
		await connectToDatabase()

		const user = await User.findOne({ clerkId: userId })
		if (!user) throw new Error("User not found.")

		const deletedUser = await User.findOneAndDelete(user._id)
		revalidatePath("/")

		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error) {
		handleError(error)
	}
}

// USE TOKENS
export async function useTokens(userId: string, tokenFee: number) {
	try {
		await connectToDatabase()

		const updatedUserFee = await User.findOneAndUpdate(
			{ _id: userId },
			{ $inc: { tokenBalance: tokenFee } },
			{ new: true }
		)

		if (!updatedUserFee) throw new Error("User Update not successful.")

		return JSON.parse(JSON.stringify(updatedUserFee))
	} catch (error) {
		handleError(error)
	}
}
