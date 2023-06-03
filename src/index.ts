import * as dotenv from "dotenv";
import { Database } from "sqlite3";

import server from "./server";
import { AppDataSource } from "./database/typeorm";

// Environment setup
dotenv.config();

// Database setup
const db = new Database("sqlite.db");
AppDataSource.initialize();
db.close();

// Server setup
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
server.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});

// Bot setup with long polling
// bot.start();
