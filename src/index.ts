import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { ProfilingIntegration } from "@sentry/profiling-node";
import country from "./routes/country";
import * as Sentry from "@sentry/node";

const port = 3000;
const app = express();

Sentry.init({
  dsn: 'https://6c02a46498d3f88a4abaf034c6607317@o4506220169265152.ingest.sentry.io/4506220174770176',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use("/country", country);

app.get('/gtg', (request: Request, respose: Response) => {
  return respose.send('hello world!')
})

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err: any, req: Request, res: any, next: NextFunction) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
