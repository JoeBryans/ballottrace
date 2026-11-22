import { ShieldCheck, Zap, Users, LockKeyhole } from "lucide-react";

const trustItems = [
  { title: "Accurate & Verifiable", icon: ShieldCheck },
  { title: "Fast Result Processing", icon: Zap },
  { title: "Scalable Nationwide", icon: Users },
  { title: "Secure & Audit Ready", icon: LockKeyhole },
];

export function TrustBar() {
  return (
    <section className="border-b bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-8 md:grid-cols-4 lg:px-8">
        {trustItems.map(({ title, icon: Icon }) => (
          <div key={title} className="flex items-center justify-center gap-3">
            <Icon className="shrink-0 text-emerald-600" size={23} />
            <span className="text-sm font-semibold text-slate-700">
              {title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
