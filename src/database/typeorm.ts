import { DataSource } from "typeorm";
import { Chat } from "../domains/chat/entities";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "sqlite.db",
  synchronize: true,
  logging: true,
  entities: [Chat],
  subscribers: [],
  migrations: [],
});