import { Schema } from "mongoose";

export const reserveSchema = new  Schema({
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    id_book: {
        type: Schema.ObjectId,
        required: true
    },
    id_reader: {
        type: Schema.ObjectId,
        required: true
    },
    name_reader: {
        type: String,
        required: true
    },
    name_book: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})
