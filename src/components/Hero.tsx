import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand via-brand-soft to-brand" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-6 px-4 text-center"
      >
        <h2 className="text-4xl font-extrabold sm:text-5xl">
          Mohcine <span className="text-accent">Erghouni</span>
        </h2>

        <p className="text-lg text-slate-300">
          <strong>Full-Stack Digital Creator</strong>
        </p>

        {/* deux boutons côte à côte */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-block rounded-full bg-accent px-8 py-3 font-medium text-brand transition hover:scale-105"
          >
            Let’s work together
          </a>

          <Link
            to="/projects"
            className="inline-block rounded-full border border-accent px-8 py-3 font-medium text-accent transition hover:bg-accent/10"
          >
            Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}