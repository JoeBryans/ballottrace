import { FileCheck2, History, Shield, Eye } from "lucide-react";

const benefits = [
  {
    title: "Traceable submissions",
    description:
      "Keep submitted result sheets connected to their extracted records.",
    icon: FileCheck2,
  },
  {
    title: "Review history",
    description:
      "Maintain a record of result reviews and verification activities.",
    icon: History,
  },
  {
    title: "Controlled access",
    description:
      "Protect sensitive operations with appropriate access controls.",
    icon: Shield,
  },
  {
    title: "Visible status",
    description: "Understand which results are submitted, pending or verified.",
    icon: Eye,
  },
];

export function Transparency() {
  return (
    <section id="transparency" className="bg-[#071d31] px-5 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-semibold text-emerald-400">
            BUILT AROUND ACCOUNTABILITY
          </span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Every result should have a traceable record.
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            BallotTrace helps maintain visibility into how results are
            submitted, processed, reviewed and collated.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <Icon className="text-emerald-400" size={30} />
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
