import * as dotenv from "dotenv";

import { AppDataSource } from "./data/typeorm";
import TelegramBot from "./bot";
import Server from "./server";
import Redis from "./cache";

// Environment setup
dotenv.config();

// Cache setup
export const cache = new Redis();
cache.init();

// Database setup
AppDataSource.initialize();

// Bot setup with long polling
const telegramBot = new TelegramBot();
telegramBot.init();

// Server setup
const server = new Server(telegramBot);
server.init();

// Config
export const DEFAULT_LATEST_MESSAGES = 10;
