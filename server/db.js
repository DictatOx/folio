import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const root = dirname(fileURLToPath(import.meta.url));        // dossier /server
const dbFile = resolve(root, "../portfolio.db");             // => racine du proj.

export const db = await open({
  filename: dbFile,
  driver: sqlite3.Database,
  mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
});
await db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    text        TEXT,
    done        INTEGER DEFAULT 0,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
await db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    type     TEXT,          -- "video" | "web"
    title    TEXT,
    subtitle TEXT,
    img      TEXT,
    url      TEXT
  );
`);