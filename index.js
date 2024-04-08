import express from "express"

import neo4j from "neo4j-driver"
import dotenv from "dotenv"
import findModel from './models/data.js'

const app = express()
const port = 3000
dotenv.config()

app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})


app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false}))

app.get('/findAll', async (req,res) => {
    const result = await findModel.findAll()
    res.json(result)
})

app.get('/findByDst/:dst', async (req,res) => {
    const result = await findModel.findByDst(req.params.dst)
    const formattedResult = result.map(data => ({
        from: data.p.start.properties.uuBaru,
        to: data.p.end.properties.uuLama
    }))
    res.json(formattedResult)
})

app.get('/findById/:id', async (req,res) => {
    const result = await findModel.findById(req.params.id)
    console.log(result)
    const formattedResult = result.map(item => {
        const startProperties = item.n.properties;
        const id = startProperties.nomor;
        return { id, tentang: startProperties.tentang };
    });
    res.json(formattedResult)
})

app.get('/findByTopic/:topic', async (req,res) => {
    const result = await findModel.findByTopic(req.params.topic)
    const formattedResult = result.map(item => {
        const startProperties = item.u.properties;
        const id = startProperties.nomor ;
        return { id, tentang: startProperties.tentang };
    });
    res.json(formattedResult)
})


