import {
  FileUp,
  Cpu,
  ShieldCheck,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Results",
    description: "Submit polling-unit result sheets as images or PDFs.",
    icon: FileUp,
  },
  {
    number: "02",
    title: "Extract with AI",
    description: "Automatically read and capture the result data.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Verify Accuracy",
    description: "Review, validate and confirm extracted results.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Collate Results",
    description: "Aggregate results by polling unit, LGA and state.",
    icon: ChartNoAxesCombined,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold text-emerald-600">
            SIMPLE WORKFLOW
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            How BallotTrace Works
          </h2>
          <p className="mt-4 text-slate-500">
            From polling-unit result sheets to verified, collated outcomes in
            four simple steps.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, title, description, icon: Icon }, i) => (
            <div
              key={number}
              className="relative rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            >
              <span className="text-sm font-bold text-emerald-600">
                {number}
              </span>
              <div className="my-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {description}
              </p>
              {i !== 3 && (
                <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden text-emerald-500 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
