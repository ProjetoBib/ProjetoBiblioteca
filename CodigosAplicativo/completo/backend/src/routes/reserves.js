import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { db } from "../database/index.js";

export function createReserves(app) {
    const schema = z.object({
        name_book: z.string().min(1),
        name_reader: z.string().min(1),
        id_reader: z.string().min(5),
        status: z.number().int()
    });

    app.post("/reserves/create", async (req, res) => {
        const result = schema.safeParse(req.body);
        console.log(result, "result");

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { name_book, name_reader, id_reader, status } = result.data;

        try {
            // Encontrar o livro pelo nome
            const book = await db.books.findOne({ title: name_book });
            console.log(name_book);

            if (!book) {
                return res.status(StatusCodes.NOT_FOUND).send("Livro não encontrado");
            }

            if (book.quantity <= 0) {
                return res.status(StatusCodes.BAD_REQUEST).send("Não há exemplares disponíveis para este livro");
            }

            // Encontrar o leitor pelo nome e matrícula
            const reader = await db.readers.findOne({ name: name_reader, registration: id_reader });

            if (!reader) {
                return res.status(StatusCodes.NOT_FOUND).send("Leitor não encontrado");
            }

            const dateStart = new Date();
            const dateEnd = new Date(dateStart);
            dateEnd.setDate(dateEnd.getDate() + 14); // Adiciona 14 dias

            const reserveData = {
                dateStart,
                dateEnd,
                id_book: book.id,
                id_reader: reader.id,
                name_reader: reader.name,
                name_book: book.title,
                status
            };

            const reserve = await db.reservers.create(reserveData);

            // Atualizar a quantidade disponível do livro
            await db.books.findByIdAndUpdate(book.id, { $inc: { quantity: -1 } });

            return res.status(StatusCodes.CREATED).send({
                message: "Reserva criada e exemplar retirado",
                id: reserve.id
            });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}

export function closeReserves(app) {
    app.post("/reserves/close", async (req, res) => {
        const schemaClose = z.object({
            id: z.string().min(5)
        });

        const result = schemaClose.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { id } = result.data;

        try {
            const reserve = await db.reservers.findById(id);

            if (!reserve) {
                return res.status(StatusCodes.NOT_FOUND).send("Reserva não encontrada");
            }

            const book = await db.books.findById(reserve.id_book);

            if (!book) {
                return res.status(StatusCodes.NOT_FOUND).send("Livro não encontrado");
            }

            await db.books.findByIdAndUpdate(book.id, { $inc: { quantity: 1 } });

            await db.reservers.findByIdAndUpdate(id, { status: 2 });

            return res.status(StatusCodes.OK).send("Reserva fechada com sucesso");
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}

export function listReserves(app) {
    app.get("/reserves/list", async (req, res) => {
        try {
            const reserves = await db.reservers.find({});

            if (reserves.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).send("Nenhuma reserva encontrada");
            }

            return res.status(StatusCodes.OK).send(reserves);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}

export function listReservesByReaderId(app) {
    const schema = z.object({
        id_reader: z.string().min(5)
    });

    app.post("/reserves/find-by-reader", async (req, res) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).send(result.error.errors);
            return;
        }

        const { id_reader } = result.data;
        try {
            const reserves = await db.reservers.find({ id_reader });

            if (reserves.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).send("Nenhuma reserva encontrada para este leitor");
            }

            return res.status(StatusCodes.OK).send(reserves);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}

export function listOverdueReserves(app) {
    app.get("/reserves/overdue", async (req, res) => {
        try {
            const now = new Date();
            const overdueReserves = await db.reservers.find({
                dateEnd: { $lt: now },
                status: 1 // Verifica também se o status é 1 (ativo)
            });

            if (overdueReserves.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).send("Nenhuma reserva vencida encontrada");
            }

            return res.status(StatusCodes.OK).send(overdueReserves);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}