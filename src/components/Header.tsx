import { Menu } from "lucide-react";

const anchors = ["Accueil", "Skills", "Experience", "Contact"];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brand/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">
          Mohcine<span className="text-accent">.</span>
        </h1>

        <ul className="hidden gap-8 md:flex">
          {anchors.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="transition hover:text-accent">
                {l}
              </a>
            </li>
          ))}

          {/* lien Projects vers /projects */}
          
        </ul>

        <button className="md:hidden">
          <Menu />
        </button>
      </nav>
    </header>
  );
}