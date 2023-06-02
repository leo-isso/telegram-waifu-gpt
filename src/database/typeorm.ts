import { DataSource } from "typeorm";
import { Chat } from "../domains/chat/entities";

export default new DataSource({
  type: "sqlite",
  database: "sqlite.db",
  synchronize: true,
  logging: true,
  entities: [Chat],
  subscribers: [],
  migrations: [],
});