import * as dotenv from "dotenv";
import { Database } from "sqlite3";

import openai from "./openai/openai";
import { getPersonalityMessage } from "./openai/personality";
import { AppDataSource } from "./database/typeorm";

dotenv.config();

const db = new Database("sqlite.db");
AppDataSource.initialize();
db.close();

openai.createChatCompletion({
  model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
  messages: [
    getPersonalityMessage(),
    {
      role: "user",
      content: "Hey, who are you? Can you tell me how was your day today?"
    }
  ],
  temperature: 0,
}).then(res => console.log(res.data.choices.map(c => console.log(c))));
