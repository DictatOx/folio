import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import "dotenv/config";

export const router = Router();

/* ---------- Auth ---------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL) return res.sendStatus(401);
  const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "4h" });
  res.json({ token });
});

/* middleware */
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
};

/* ---------- CRUD ---------- */
router.get("/projects", async (_req, res) => {
  const rows = await db.all("SELECT * FROM projects ORDER BY id DESC");
  res.json(rows);
});

router.post("/projects", auth, async (req, res) => {
  const { type, title, subtitle, img, url } = req.body;
  const { lastID } = await db.run(
    "INSERT INTO projects (type,title,subtitle,img,url) VALUES (?,?,?,?,?)",
    [type, title, subtitle, img, url]
  );
  res.json({ id: lastID });
});

router.put("/projects/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { type, title, subtitle, img, url } = req.body;
  await db.run(
    "UPDATE projects SET type=?,title=?,subtitle=?,img=?,url=? WHERE id=?",
    [type, title, subtitle, img, url, id]
  );
  res.sendStatus(204);
});

router.delete("/projects/:id", auth, async (req, res) => {
  await db.run("DELETE FROM projects WHERE id=?", req.params.id);
  res.sendStatus(204);
});

/* ---------- NOTES CRUD ---------- */
router.get("/notes", async (_req, res) => {
  const rows = await db.all("SELECT * FROM notes ORDER BY id DESC");
  res.json(rows);
});

router.post("/notes", auth, async (req, res) => {
  const { text } = req.body;
  const { lastID } = await db.run("INSERT INTO notes (text) VALUES (?)", text);
  res.json({ id: lastID });
});

router.patch("/notes/:id", auth, async (req, res) => {
  await db.run("UPDATE notes SET done = NOT done WHERE id=?", req.params.id);
  res.sendStatus(204);
});

router.delete("/notes/:id", auth, async (req, res) => {
  await db.run("DELETE FROM notes WHERE id=?", req.params.id);
  res.sendStatus(204);
});