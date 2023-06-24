import { DataSource } from "typeorm";
import { Chat } from "../domains/chat/entities";
import { Message } from "../domains/message/entities";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "sqlite.db",
  synchronize: true,
  logging: false,
  entities: [Chat, Message],
  subscribers: [],
  migrations: [],
});
