import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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
  { 
    title: "CoAnda-Store", 
    stack: ["React.js", "Next.js", "Tailwind", "Shopify"], 
    desc: "Landing page e-commerce avec CTA de redirection directe vers le paiement Shopify.",
    url: "https://www.coanda-store.com" 
  },
  { 
    title: "MTLJUGG", 
    stack: ["React", "TypeScript", "Vercel"], 
    desc: "Plateforme web pour une société d'import-export et logistique internationale au Maroc.",
    url: "https://www.mtljugg.com" 
  },
  { 
    title: "Victoria Hills", 
    stack: ["React", "UI/UX", "Tailwind"], 
    desc: "Site vitrine immersif et moderne dédié à un nouveau programme immobilier.",
    url: "https://victoria-hills.vercel.app/" 
  },
  { 
    title: "RappelSMS.ma", 
    stack: ["Node.js", "Express", "SQLite", "React"], 
    desc: "Micro-SaaS d'automatisation de SMS et rappels de rendez-vous avec architecture backend complète.",
    url: "https://rappelsms-jch75o3dt-mohcine-erghounis-projects.vercel.app/" 
  },
];

type Project = {
  id?: number;
  type: "video" | "web";
  title: string;
  subtitle: string;
  desc?: string;
  stack?: string[];
  img?: string;
  url: string;
};

export default function ProjectsPage() {
  const [tab, setTab] = useState<"video" | "web">("video");
  const [projects, setProjects] = useState<Project[]>([]);
  
  // États pour le formulaire de contact style Claude
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setProjects([
      ...staticVideo.map<Project>((p) => ({ type: "video", title: p.title, subtitle: p.role, img: p.img, url: p.url })),
      ...staticWeb.map<Project>((p) => ({ type: "web", title: p.title, subtitle: p.stack.join(" • "), desc: p.desc, stack: p.stack, url: p.url })),
    ]);

    (async () => {
      try {
        const res = await fetch("http://localhost:4000/api/projects");
        const apiList: Project[] = await res.json();
        setProjects((prev) => {
          const urls = new Set(prev.map((p) => p.url));
          return [...prev, ...apiList.filter((p) => !urls.has(p.url))];
        });
      } catch {
        console.warn("API offline — affichage statique actif");
      }
    })();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  const list = projects.filter((p) => p.type === tab);

  const Card = ({ p }: { p: Project }) => {
    if (p.type === "web") {
      return (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col justify-between p-7 rounded-xl bg-[#0a0a0a] border border-white/[0.08] 
                     transition-all duration-300 hover:border-white/20 hover:bg-[#111]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                {p.title}
              </h3>
              <span className="text-neutral-600 group-hover:text-white transition-colors text-sm">↗</span>
            </div>
            
            {p.desc && (
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed font-normal">
                {p.desc}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
            {p.stack?.map((tech, i) => (
              <span 
                key={i} 
                className="text-[11px] font-mono tracking-wider px-2.5 py-0.5 bg-white/[0.03] text-neutral-400 rounded border border-white/[0.05]"
              >
                {tech}
              </span>
            ))}
          </div>
        </a>
      );
    }

    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a]
                   transition-all duration-300 hover:border-white/20"
      >
        <div className="aspect-video w-full overflow-hidden bg-neutral-900">
          <img
            src={p.img}
            alt={p.title}
            className="h-full w-full object-cover object-center opacity-80 duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-sm text-white tracking-tight">{p.title}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{p.subtitle}</p>
          </div>
          <span className="text-neutral-600 group-hover:text-white transition-colors text-sm">↗</span>
        </div>
      </a>
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] py-20 text-neutral-200 font-sans selection:bg-white selection:text-black relative">
      <Container>
        <div className="mb-14 flex items-center justify-between border-b border-white/[0.08] pb-6">
          <Link 
            to="/" 
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span> Index
          </Link>

          <div className="flex gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/[0.06]">
            {(["video", "web"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all
                  ${tab === t 
                    ? "bg-white text-black font-medium" 
                    : "text-neutral-400 hover:text-white"}`}
              >
                {t === "video" ? "Video" : "Web"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Card key={p.url} p={p} />
          ))}
        </div>

        {/* SECTION CTA / FORMULAIRE STYLE CLAUDE (affiché uniquement sur l'onglet Web ou toujours dispo) */}
        {tab === "web" && (
          <section className="mt-24 pt-16 border-t border-white/[0.08] max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Collaboration</span>
              <h2 className="text-2xl font-semibold text-white tracking-tight mt-2">Démarrons un projet ensemble</h2>
              <p className="text-xs text-neutral-400 mt-1.5">Une idée, un site web ou une refonte ? Envoyez-moi un message.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#080808] border border-white/[0.08] shadow-2xl relative overflow-hidden">
              {/* Effet de lueur subtil façon interface épurée */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white mb-2">✓</div>
                  <h3 className="text-white font-medium text-base">Message bien reçu</h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">Merci pour votre message. Je vous réponds dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs font-mono text-neutral-400 hover:text-white underline transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Nom</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Votre nom" 
                        className="w-full bg-[#030303] border border-white/[0.08] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="votre@email.com" 
                        className="w-full bg-[#030303] border border-white/[0.08] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Message</label>
                    <textarea 
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Parlez-moi de votre projet..."
                      className="w-full bg-[#030303] border border-white/[0.08] rounded-lg p-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 bg-white text-black font-medium text-xs tracking-wide rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message ↗"}
                  </button>
                </form>
              )}
            </div>
          </section>
        )}
      </Container>

      {/* BOUTON FLOTTANT WHATSAPP (Bas à droite) */}
      <a
        href="https://wa.me/212600000000" /* Remplace par ton vrai numéro au format international sans le + */
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
      >
        <svg 
          className="w-6 h-6 fill-current" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </main>
  );
}