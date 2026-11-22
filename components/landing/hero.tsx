import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  ChartColumnIncreasing,
} from "lucide-react";

const metrics = [
  { label: "Polling units", value: "176,846", icon: MapPin },
  { label: "Results received", value: "142,320", icon: FileText },
  { label: "Verified results", value: "139,876", icon: ShieldCheck },
];

export function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-[#071d31] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">
            <ShieldCheck size={15} />
            Election Results Management Platform
          </span>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Collect, Verify & Collate Election Results with{" "}
            <span className="text-emerald-400">Confidence.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 sm:text-lg">
            A modern platform for collecting polling-unit results, extracting
            data with AI, verifying accuracy, and collating transparent election
            outcomes.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-400"
            >
              Get started <ArrowRight size={18} />
            </Link>

            <Link
              href="#how-it-works"
              className="rounded-xl border border-white/30 px-6 py-4 font-semibold transition hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            {[
              "Polling-unit results",
              "AI data extraction",
              "Transparent collation",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative rounded-2xl border border-white/20 bg-[#102e47] p-3 shadow-2xl shadow-emerald-950/40 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-bold">BallotTrace</span>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
          ● Demo overview
        </span>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 text-slate-900 sm:p-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-bold">Election Overview</h3>
          <span className="text-xs text-emerald-700">Sample data</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-lg border bg-white p-3">
              <Icon className="mb-2 text-emerald-600" size={20} />
              <p className="text-lg font-bold">{value}</p>
              <p className="text-[10px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-white p-4">
            <h4 className="text-sm font-bold">Results by party</h4>
            <div className="mt-5 flex h-28 items-end justify-around gap-3">
              {[75, 55, 40, 25, 15].map((height, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-md bg-emerald-500"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h4 className="text-sm font-bold">Verification progress</h4>
            <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-emerald-500">
              <span className="text-lg font-bold">80.5%</span>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Sample coverage
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-white p-4">
          <h4 className="mb-3 text-sm font-bold">Recent polling units</h4>
          {["PU 012", "PU 013", "PU 014"].map((unit, i) => (
            <div
              key={unit}
              className="flex justify-between border-t py-3 text-xs"
            >
              <span>{unit}</span>
              <span>Ikorodu, Lagos</span>
              <span className={i === 2 ? "text-amber-600" : "text-emerald-600"}>
                {i === 2 ? "Pending" : "Verified"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
