import { createBook, findBooks , findBookByTitle} from "./books.js"
import { createReaders, listReaders, listReader } from './readers.js'
import { createReserves, listReserves, listReservesByReaderId, listOverdueReserves, closeReserves } from './reserves.js'

function booksRoutes(app) {
    createBook(app)
    findBooks(app)
    findBookByTitle(app)
}

function readersRoutes(app) {
    createReaders(app)
    listReaders(app)
    listReader(app)
}

function reservesRoutes(app) {
    createReserves(app)
    listReserves(app)
    listReservesByReaderId(app)
    listOverdueReserves(app)
    closeReserves(app)
}

export const initializeRoutes = (app) => {
    booksRoutes(app)
    readersRoutes(app)
    reservesRoutes(app)
}