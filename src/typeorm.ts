import { DataSource } from "typeorm";
import { Chat } from "./Chat";

export default new DataSource({
  type: "sqlite",
  database: "sqlite.db",
  synchronize: true,
  logging: true,
  entities: [Chat],
  subscribers: [],
  migrations: [],
});