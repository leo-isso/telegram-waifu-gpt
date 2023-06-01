import { Database } from "sqlite3";

import dataSource from "./typeorm"

const db = new Database("sqlite.db");
dataSource.initialize();
db.close();