import mongoose, {model} from "mongoose";
import { readersSchema } from "./schemas/readers.js";
import { bookSchema } from "./schemas/books.js";
import { reserveSchema } from "./schemas/reserves.js";

try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DSatabase conected")
} catch (error) {
    console.error(error)
    process.exit(1)
}

export const db = {
    readers: model("reader", readersSchema, "readers"),
    books: model("book", bookSchema, "books"),
    reservers: model("reserve", reserveSchema, "reserves")
}