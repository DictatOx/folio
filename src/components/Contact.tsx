import Container from "./Container";

export default function Contact() {
  return (
    <section id="contact" className="py-24 scroll-mt-24 bg-brand-soft">
      <Container>
        <div className="mx-auto max-w-lg text-center space-y-8">
          <h3 className="text-2xl font-bold">Restons en contact</h3>
          <p className="text-slate-300">
            Disponible pour missions freelance, consulting ou collaborations créatives.
          </p>

          <a
            href="mailto:GhirMohcine@gmail.com"
            className="block rounded-lg bg-accent py-3 font-medium text-brand
                       hover:scale-105 transition"
          >
            GhirMohcine@gmail.com
          </a>

          <a href="tel:+212603810281" className="block underline hover:text-accent">
            +212 6 03 81 02 81
          </a>

          <p>Rabat, Morocco</p>
        </div>
      </Container>
    </section>
  );
}