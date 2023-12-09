const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded())

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