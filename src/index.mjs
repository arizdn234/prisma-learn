import { PrismaClient } from "@prisma/client";
import Express, { json } from "express";

const prisma = new PrismaClient()
const port = 3000
const app = Express()

app.use(Express.json())

app.get('/artists', async (req, res) => {
    const artists = await prisma.artist.findMany()
    res.json({
        success: true,
        payload: artists,
        message: "Operation successful"
    })
})

app.use((req, res, next) => {
    res.status(404)
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`
    })
})

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})