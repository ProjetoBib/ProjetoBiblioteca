import { Schema } from "mongoose";

// {
//     "name": "Teste Lirvo",
//     "registration": "teste",
//     "class": "teste",
//     "age": 1
//   }

export const readersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    numReserves: {
        type: Number,
    },
    class: {
        type: String,
        required: true
    }
})