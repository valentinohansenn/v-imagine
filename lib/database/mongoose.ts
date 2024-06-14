import mongoose, { Mongoose } from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
	conn: Mongoose | null
	promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
	cached = (global as any).mongoose = {
		conn: null,
		promise: null,
	}
}

export const connectToDatabase = async () => {
	// Check if there is a cache connection
	if (cached.conn) return cached.conn

	if (!MONGODB_URL) throw new Error("Missing MONGODB_URL!")

	// If not, it will make the connection with the MongoDB
	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: "v-imagine",
			bufferCommands: false,
		})

	cached.conn = await cached.promise

	return cached.conn
}
