import Container from "./Container";

const schools = [
  { degree: "Licence en informatique", school: "CNAM, Rabat", period: "2023 – 2024" },
  { degree: "DTS Développement Multimédia", school: "EPAG, Rabat", period: "2018 – 2020" },
  { degree: "Bac Comptabilité Générale", school: "Al Amana, Tanger", period: "2016 – 2018" },
];

export default function Education() {
  return (
    <section id="formation" className="py-24 scroll-mt-24 bg-brand">
      <Container>
        <h3 className="mb-8 text-2xl font-bold">Formation</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {schools.map((s) => (
            <div key={s.degree} className="rounded-xl bg-brand-lighter p-6 shadow">
              <h4 className="font-semibold">{s.degree}</h4>
              <p className="text-slate-400">{s.school}</p>
              <time className="text-sm text-slate-500">{s.period}</time>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}