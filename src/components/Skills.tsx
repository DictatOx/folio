import Container from "./Container";

const skills = [
  "HTML / CSS / JS",
  "React",
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "SEO",
  "Intégration API",
  "Service Client",
  "Sécurité Réseau",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 scroll-mt-24 bg-brand">
      <Container>
        <h3 className="mb-8 text-2xl font-bold">Skills</h3>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((s) => (
            <li
              key={s}
              className="rounded-xl bg-brand-lighter p-4 text-center
                         shadow hover:scale-105 transition-transform"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}