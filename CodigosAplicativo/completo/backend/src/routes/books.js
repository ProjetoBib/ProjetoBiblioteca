import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { db } from "../database/index.js";

export function createBook(app) {
    const schema = z.object({
        title: z.string().min(3),
        author: z.string().min(3),
        pubComp: z.string().min(3),
        quantity: z.number().min(1),
        genre: z.string().optional()
    });

    app.post("/books/create", async (req, res) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { data } = result;
        try {
            const book = await db.books.create(data);  
            return res.status(StatusCodes.CREATED).send({
                message: "Livro criado",
                id: book.id
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    })
}
/**
 * 
 * @param {import("express").Express} app 
 */

export function findBooks(app) {
    app.get("/books/list", async(req, res) => {
    
        try {
            const usert = await db.books.find({quantity: {$gt: 0 }})

            if(!usert){
                return res.status(404).send("Livro não encontrado")
            }

            return res.status(200).send(usert)
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    })
}

/**
 * 
 * @param {import("express").Express} app 
 */

export function findBookByTitle(app) {
    const schema = z.object({
        title: z.string().min(1),
    });

    app.post("/books/find", async (req, res) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { title } = result.data;
        try {
            const books = await db.books.find({ title: { $regex: title, $options: 'i' } });

            if (books.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).send("Livro não encontrado");
            }

            return res.status(StatusCodes.OK).send(books);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}