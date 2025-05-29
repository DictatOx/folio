import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Types ---------- */
type Project = { id: number; type: string; title: string; subtitle: string; img: string; url: string };
type Note    = { id: number; text: string; done: 0 | 1 };

export default function AdminDashboard() {
  const nav   = useNavigate();
  const token = localStorage.getItem("jwt") || "";
  const [tab, setTab] = useState<"projects" | "notes">("projects");

  /* ------- PROJECT STATE ------- */
  const [rows, setRows] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({ type: "video" });

  /* ------- NOTES STATE ------- */
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  /* ------- API helper ------- */
  const api = (p: string, o: RequestInit = {}) =>
    fetch("http://localhost:4000/api" + p, {
      ...o,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

  /* ------- ON LOAD ------- */
  useEffect(() => {
    if (!token) return nav("/login");

    api("/projects")
      .then(r => {
        if (!r.ok) throw new Error("Erreur récupération projets");
        return r.json();
      })
      .then(setRows)
      .catch(e => console.error(e));

    api("/notes")
      .then(r => {
        if (!r.ok) throw new Error("Erreur récupération notes");
        return r.json();
      })
      .then(setNotes)
      .catch(e => console.error(e));
  }, []);

  /* ------- ADD PROJECT ------- */
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return alert("Le titre et l'URL sont obligatoires");
    const res = await api("/projects", { method: "POST", body: JSON.stringify(form) });
    if (!res.ok) return alert("Erreur ajout projet");
    const { id } = await res.json();
    setRows([{ id, ...(form as Project) }, ...rows]);
    setForm({ type: "video" });
  };

  /* ------- DEL PROJECT ------- */
  const delProject = async (id: number) => {
    if (!window.confirm("Confirmer suppression ?")) return;
    const res = await api("/projects/" + id, { method: "DELETE" });
    if (!res.ok) return alert("Erreur suppression projet");
    setRows(rows.filter(r => r.id !== id));
  };

  /* ------- ADD NOTE ------- */
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const res = await api("/notes", { method: "POST", body: JSON.stringify({ text: noteText }) });
    if (!res.ok) return alert("Erreur ajout note");
    const { id } = await res.json();
    setNotes([{ id, text: noteText, done: 0 }, ...notes]);
    setNoteText("");
  };

  /* ------- TOGGLE DONE ------- */
  const toggleNote = async (n: Note) => {
    const res = await api("/notes/" + n.id, { method: "PATCH" });
    if (!res.ok) return alert("Erreur modification note");
    setNotes(notes.map(x => (x.id === n.id ? { ...x, done: x.done ? 0 : 1 } : x)));
  };

  /* ------- DEL NOTE ------- */
  const delNote = async (id: number) => {
    if (!window.confirm("Confirmer suppression ?")) return;
    const res = await api("/notes/" + id, { method: "DELETE" });
    if (!res.ok) return alert("Erreur suppression note");
    setNotes(notes.filter(n => n.id !== id));
  };

  /* ================= RENDER ================= */
  return (
    <main className="min-h-screen bg-brand p-10 text-white">
      <h1 className="mb-8 text-2xl font-bold">Admin dashboard</h1>

      {/* Switch tabs */}
      <div className="mb-8 flex gap-4">
        {["projects", "notes"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition
              ${tab === t ? "bg-white text-brand" : "border border-white text-white/80 hover:bg-white/10"}`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ========== PROJECTS TAB ========== */}
      {tab === "projects" && (
        <>
          {/* quick add */}
          <form onSubmit={addProject} className="mb-8 flex flex-wrap gap-2">
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="rounded bg-brand-soft p-2"
            >
              <option value="video">video</option>
              <option value="web">web</option>
            </select>
            {["title", "subtitle", "img", "url"].map(k => (
              <input
                key={k}
                placeholder={k}
                value={(form as any)[k] ?? ""}
                onChange={e => setForm({ ...form, [k]: e.target.value })}
                className="rounded bg-brand-soft p-2"
              />
            ))}
            <button className="rounded bg-white px-4 text-brand">Add</button>
          </form>

          {/* list */}
          <table className="w-full text-sm">
            <thead className="text-left text-accent">
              <tr><th>Type</th><th>Title</th><th>Subtitle</th><th>URL</th><th /></tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} className="border-t border-white/10">
                  <td>{p.type}</td>
                  <td>{p.title}</td>
                  <td>{p.subtitle}</td>
                  <td className="truncate">{p.url}</td>
                  <td>
                    <button
                      onClick={() => delProject(p.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ========== NOTES TAB ========== */}
      {tab === "notes" && (
        <>
          {/* add note */}
          <form onSubmit={addNote} className="mb-6 flex gap-2">
            <input
              placeholder="New note…"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              className="flex-1 rounded bg-brand-soft p-2"
            />
            <button className="rounded bg-white px-4 text-brand">Add</button>
          </form>

          {/* note list */}
          <ul className="space-y-3">
            {notes.map(n => (
              <li key={n.id} className="flex items-center justify-between rounded bg-brand-soft p-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!n.done}
                    onChange={() => toggleNote(n)}
                    className="mr-3 accent-accent"
                  />
                  <span className={n.done ? "line-through text-white/50" : ""}>{n.text}</span>
                </label>
                <button
                  onClick={() => delNote(n.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Del
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}