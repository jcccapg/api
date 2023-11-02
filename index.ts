import express, { Request, Response } from 'express'
import country from "./routes/country"
import 'dotenv/config';

const app = express();
const port = 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
/*
    const timeoutMiliseconds = 30000
    app.set('server.timeout', time)
*/

app.use("/country", country);
app.get('/', async (_req: Request, res: Response) => {
    const response = await fetch('https://jsonplaceholder.org/posts');
    const data = await response.json();

    res.send(data);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})