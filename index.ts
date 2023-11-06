import "dotenv/config";
import express, { Request, Response } from "express";
import country from "./routes/country";

const app = express();
const port = 3000;

app.use("/country", country);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
