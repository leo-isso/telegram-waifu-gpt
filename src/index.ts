import * as dotenv from "dotenv";
import { Database } from "sqlite3";

import server from "./server";
import openai from "./openai/openai";
import { getPersonalityMessage } from "./openai/personality";
import { AppDataSource } from "./database/typeorm";
import bot from "./bot";

// Environment setup
dotenv.config();

// Database setup
const db = new Database("sqlite.db");
AppDataSource.initialize();
db.close();

// Server setup
const host = process.env.SERVER_PORT;
const port = process.env.SERVER_PORT;
server.listen(port, () => {
  console.log(`Server is running at ${host}${port}`);
});

// Bot setup
bot.start();

openai.createChatCompletion({
  model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
  messages: [
    getPersonalityMessage(),
    {
      role: "system",
      content: "Introduce yourself, greet the user, and ask him how he is doing."
    }
  ],
  temperature: 0,
}).then(res => console.log(res.data.choices.map(c => console.log(c))));
