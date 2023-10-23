import express, { Request, Response } from 'express'
import nodeFetch from 'node-fetch'
const app = express()
const port = 3000

app.get('/', async (_req: Request, res: Response) => {
    const response = await nodeFetch('https://jsonplaceholder.org/posts');
    const data = await response.json();
    res.send(data);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})