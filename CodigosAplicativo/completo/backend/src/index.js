import express from "express"
import { initializeRoutes } from "./routes/index.js";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

initializeRoutes(app)

app.listen(8000, () => {
    console.log("app listen on PORT 8000")
})
