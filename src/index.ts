import * as dotenv from "dotenv";
dotenv.config();

import { Database } from "sqlite3";

import dataSource from "./database/typeorm";
import openai from "./openai/openai";
import personality from "./database/personality";


const db = new Database("sqlite.db");
dataSource.initialize();
db.close();

openai.createChatCompletion({
  model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: personality
    },
    {
      role: "user",
      content: "Hey, who are you? Can you tell me how was your day today?"
    }
  ],
  temperature: 0,
}).then(res => console.log(res.data.choices.map(c => console.log(c))));
