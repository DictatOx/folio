import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

/* helper pour miniatures YouTube */
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* -------- TES PROJETS FIXES -------- */
const staticVideo = [
  { title: "Marouane Le M – Quoi", role: "Director · Editor", img: ytThumb("Teumk-qvbo8"), url: "https://youtu.be/Teumk-qvbo8" },
  { title: "Inauguration – Maison d’Amendes", role: "Camera · Editor", img: ytThumb("4M3hOjAw8mk"), url: "https://youtu.be/4M3hOjAw8mk" },
  { title: "OBUNS Tanger (Restaurant)", role: "Camera · Editor", img: ytThumb("yitsTJD8_38"), url: "https://youtu.be/yitsTJD8_38" },
  { title: "Patro – L3A9A", role: "Director · Editor", img: ytThumb("knMS_aOW-Pw"), url: "https://youtu.be/knMS_aOW-Pw" },
  { title: "Patro – GOLIHOM", role: "Director · Editor", img: ytThumb("5ZU1avhQvj0"), url: "https://youtu.be/5ZU1avhQvj0" },
  { title: "ADHDOERS – Social Content", role: "Content Creator · Editor", img: "/icons/adhdoers-logo.png", url: "https://www.instagram.com/adhdoers/" },
  { title: "We Love Gaming – YouTube Channel", role: "Branding · Thumbnails · Editing", img: "/icons/wlg-logo.png", url: "https://youtube.com/@WeloveGamingMediaLOL" },
];

const staticWeb = [
  { title: "OBRA Travaux", stack: "Next.js • Tailwind • EmailJS", img: "/thumbs/obra.png", url: "https://obra-travaux.com" },
  { title: "La Croix Rouge – Restaurant", stack: "React • Vite • Netlify", img: "/thumbs/croixrouge.png", url: "https://lacroixrouge-restaurant.com" },
];

/* -------- TYPES -------- */
type Project = {
  id?: number;
  type: "video" | "web";
  title: string;
  subtitle: string;
  img: string;
  url: string;
};

export default function ProjectsPage() {
  const [tab, setTab] = useState<"video" | "web">("video");
  const [projects, setProjects] = useState<Project[]>([]);

  /* merge statiques + DB */
  useEffect(() => {
    // 1) injecte tes projets fixes
    setProjects([
      ...staticVideo.map<Project>((p) => ({ type: "video", title: p.title, subtitle: p.role, img: p.img, url: p.url })),
      ...staticWeb.map<Project>((p) => ({ type: "web", title: p.title, subtitle: p.stack, img: p.img, url: p.url })),
    ]);

    // 2) ajoute ceux de la base
    (async () => {
      try {
        const res = await fetch("http://localhost:4000/api/projects");
        const apiList: Project[] = await res.json();
        setProjects((prev) => {
          const urls = new Set(prev.map((p) => p.url));
          return [...prev, ...apiList.filter((p) => !urls.has(p.url))];
        });
      } catch {
        console.warn("API offline — seul contenu statique affiché");
      }
    })();
  }, []);

  const list = projects.filter((p) => p.type === tab);

  /* carte reusable */
  const Card = ({ p }: { p: Project }) => (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl ring-1 ring-white/10
                 shadow-lg transition hover:shadow-2xl hover:ring-white/30"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="h-full w-full object-cover object-center duration-300 group-hover:scale-110"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute bottom-3 left-3 z-10 text-[15px] leading-tight">
        <p className="font-bold text-white">{p.title}</p>
        <p className="text-xs text-white/70">{p.subtitle}</p>
      </div>
    </a>
  );

  return (
    <main className="min-h-screen bg-brand py-24 text-[17px] leading-relaxed">
      <Container>
        {/* nav */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="rounded-full border border-white px-6 py-2 font-semibold text-white transition hover:bg-white/10">
            ← Home
          </Link>

          <div className="flex gap-4">
            {(["video", "web"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition
                  ${tab === t ? "bg-white text-brand shadow-lg" : "border border-white text-white hover:bg-white/10"}`}
              >
                {t === "video" ? "VIDEO PROJECTS" : "WEB PROJECTS"}
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Card key={p.url} p={p} />
          ))}
        </div>
      </Container>
    </main>
  );
}