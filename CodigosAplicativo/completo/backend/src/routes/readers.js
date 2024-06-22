import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { db } from "../database/index.js";

export function createReaders(app) {
    const schema = z.object({
        name: z.string().min(3),
        registration: z.string().min(3),
        class: z.string().min(3),
        age: z.number().min(1),
        numReserves: z.string().optional()
    });

    app.post("/readers/create", async (req, res) => {
        const result = schema.safeParse(req.body);
        console.log(result, req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { data } = result;
        try {
            const reader = await db.readers.create(data);
            return res.status(StatusCodes.CREATED).send({
                message: "Usuario criado",
                id: reader.id
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    })
}

export function listReaders(app) {
    app.get("/readers/list", async(req, res) => {
    
        try {
            const usert = await db.readers.find({})

            if(!usert){
                return res.status(404).send("Usuario não encontrado")
            }

            return res.status(200).send(usert)
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    })
}

export function listReader(app) {
    const schema = z.object({
        name: z.string().min(1)
    });

    app.post("/readers/find", async (req, res) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { name } = result.data;
        try {
            const readers = await db.readers.find({ name: { $regex: name, $options: 'i' } });

            if (readers.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).send("Usuario não encontrado");
            }

            return res.status(StatusCodes.OK).send(readers);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}