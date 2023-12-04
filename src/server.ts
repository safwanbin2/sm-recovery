import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

async function bootstrap() {
  server = app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
  });

  // Connection to mongoose
  await mongoose.connect(config.db_url as string);
}

bootstrap();

process.on("unhandledRejection", () => {
  console.log(`Unhandled rejection, going offline!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`Uncaught Exception, going offline!`);
  process.exit(1);
});
