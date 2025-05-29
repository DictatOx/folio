// server/importProjects.js
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connexion SQLite
const dbPath = path.resolve(__dirname, "db.sqlite");
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbPath);

const oldProjects = [
  {
    type: "video",
    title: "Vidéo ancienne 1",
    subtitle: "Miniature et description de la vidéo 1",
    img: "video1-thumbnail.jpg",
    url: "https://youtu.be/video1",
  },
  {
    type: "video",
    title: "Vidéo ancienne 2",
    subtitle: "Miniature et description de la vidéo 2",
    img: "video2-thumbnail.jpg",
    url: "https://youtu.be/video2",
  },
  {
    type: "web",
    title: "Projet Web ancien",
    subtitle: "Miniature et description projet web",
    img: "web1-thumbnail.jpg",
    url: "https://monprojetweb.com",
  },
];

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      img TEXT,
      url TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Erreur création table:", err);
        process.exit(1);
      }

      const stmt = db.prepare(
        `INSERT INTO projects (type, title, subtitle, img, url) VALUES (?, ?, ?, ?, ?)`
      );

      oldProjects.forEach((p) => {
        stmt.run(p.type, p.title, p.subtitle, p.img, p.url);
      });

      stmt.finalize(() => {
        console.log("Import des projets statiques terminé.");
        db.close();
      });
    }
  );
});