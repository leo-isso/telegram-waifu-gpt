import { DataSource } from "typeorm";
import { Chat } from "../domains/chat/entities";
import { Message } from "../domains/message/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: parseInt(process.env.POSTGRES_PORT || ""),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [Chat, Message]
});