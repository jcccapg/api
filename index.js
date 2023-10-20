const express = require('express')
const nodeFetch = require('node-fetch')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.org/posts');
    const data = await response.json(response);

    res.send(data);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

console.log("Hola Mundo")