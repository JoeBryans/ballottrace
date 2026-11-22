import { MapPin, ShieldCheck, TrendingUp } from "lucide-react";

const results = [
  { state: "Lagos", units: 1200, received: 980, verified: 910 },
  { state: "Delta", units: 850, received: 720, verified: 690 },
  { state: "Rivers", units: 920, received: 800, verified: 760 },
];

export function ResultsPreview() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="font-semibold text-emerald-600">
            RESULTS OVERVIEW
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            See the bigger picture, down to every polling unit.
          </h2>
          <p className="mt-5 leading-8 text-slate-500">
            Understand result coverage, verification progress and aggregated
            figures across different locations.
          </p>

          <ul className="mt-8 space-y-5">
            {[
              "Track results received across locations",
              "Monitor verification progress",
              "Compare aggregated election figures",
              "Access detailed polling-unit records",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm font-medium">
                <ShieldCheck className="shrink-0 text-emerald-600" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-xl sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Regional overview</h3>
              <p className="mt-1 text-xs text-slate-500">
                Illustrative sample data
              </p>
            </div>
            <TrendingUp className="text-emerald-600" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-emerald-50 p-4">
              <MapPin className="text-emerald-600" />
              <p className="mt-3 text-2xl font-bold">2,970</p>
              <p className="text-xs text-slate-500">Total polling units</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <ShieldCheck className="text-blue-600" />
              <p className="mt-3 text-2xl font-bold">2,360</p>
              <p className="text-xs text-slate-500">Verified results</p>
            </div>
          </div>

          <div className="mt-7">
            <h4 className="mb-4 text-sm font-bold text-slate-800">
              Results by state
            </h4>
            <div className="space-y-5">
              {results.map((item) => (
                <div key={item.state}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{item.state}</span>
                    <span className="text-slate-500">
                      {item.verified} / {item.units} verified
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${(item.verified / item.units) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
