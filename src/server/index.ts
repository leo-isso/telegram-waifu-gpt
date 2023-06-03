import * as express from "express";
import { Express } from "express";
import { webhookCallback } from "grammy";

import telegramBot from "../bot";

const server: Express = express();

server.use(express.json());
server.use(webhookCallback(telegramBot, "express"));

export default server;
