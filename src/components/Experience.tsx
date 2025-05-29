import Container from "./Container";

type Job = { title: string; company: string; period: string; desc: string };

const jobs: Job[] = [
  /*— Existing experiences translated —*/
  {
    title: "Media Buyer, SEO Analyst",
    company: "Reflect Digital Agency",
    period: "June 2024 – Today",
    desc: "Produced creative solutions for ADHD communities (1 M on IG, 300 K on TikTok).",
  },
  {
    title: "Video Editor & Content Creator",
    company: "ADHDOERS",
    period: "Dec 2023 – Feb 2025",
    desc: "Produced creative solutions for ADHD communities (1 M on IG, 300 K on TikTok).",
  },
  {
    title: "Web Master",
    company: "CS PETROLEUM",
    period: "Feb 2023 – Apr 2023",
    desc: "Maintained and redesigned the company’s websites.",
  },
  {
    title: "Web Master",
    company: "FAR GROUP",
    period: "Nov 2021 – Jan 2022",
    desc: "Maintained and redesigned the company’s websites.",
  },
  {
    title: "AI Engineer (remote)",
    company: "Trueface, Los Angeles",
    period: "Jun 2020 – Oct 2021",
    desc: "Collected and annotated data for machine-learning model training.",
  },

  /*— New LinkedIn experiences —*/
  {
    title: "Founder",
    company: "Datasurf",
    period: "Dec 2019 – Jul 2020",
    desc: "Led a multidisciplinary team (video & engineering) to design and produce bespoke datasets for complex use-cases that scraping or standard aggregation couldn’t solve.",
  },
  {
    title: "Team Lead (Data Labeling)",
    company: "Trueface, Los Angeles",
    period: "Mar 2019 – Jul 2019",
    desc: "Managed and coached a team responsible for data classification and annotation.",
  },
  {
    title: "Freelance Video Editor / Director",
    company: "Self-employed",
    period: "2017 – Present",
    desc: "Shooting and editing promotional videos, music clips and social-media content for various clients.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 scroll-mt-24 bg-brand-soft">
      <Container>
        <h3 className="mb-8 text-2xl font-bold">Professional Experience</h3>

        <ol className="relative list-none border-l border-accent/50 pl-6 space-y-10">
          {jobs.map((j) => (
            <li key={j.title + j.company} className="relative pl-6">
              <span className="absolute -left-3 top-2 h-3 w-3 rounded-full bg-accent" />
              <div className="rounded-lg bg-brand-lighter p-5 shadow-lg">
                <h4 className="font-semibold">
                  {j.title} <span className="text-slate-400">@ {j.company}</span>
                </h4>
                <time className="text-xs text-slate-400">{j.period}</time>
                <p className="mt-2 text-slate-300">{j.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}