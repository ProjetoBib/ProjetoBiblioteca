import { Schema } from "mongoose";

export const bookSchema = new  Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
    },
    pubComp: {
        type: String,
    }
})
