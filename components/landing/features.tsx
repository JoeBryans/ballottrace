import {
  MapPinned,
  ScanText,
  BadgeCheck,
  ChartColumnIncreasing,
  ClipboardList,
  FileSpreadsheet,
} from "lucide-react";

const features = [
  {
    title: "Polling Unit Management",
    description:
      "Organize polling units, locations, LGAs and states in one place.",
    icon: MapPinned,
  },
  {
    title: "AI Result Extraction",
    description:
      "Extract figures from uploaded result sheets and reduce manual data entry.",
    icon: ScanText,
  },
  {
    title: "Result Verification",
    description: "Review submitted results and track verification status.",
    icon: BadgeCheck,
  },
  {
    title: "Real-time Collation",
    description:
      "View aggregated election figures across different administrative levels.",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Audit Trail",
    description:
      "Maintain a history of submissions, reviews and result changes.",
    icon: ClipboardList,
  },
  {
    title: "Reports & Export",
    description: "Generate structured reports and export election result data.",
    icon: FileSpreadsheet,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-slate-50 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <span className="font-semibold text-emerald-600">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Everything you need to manage election results
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            A unified workspace for collecting, processing, verifying and
            understanding election results.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon size={25} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
