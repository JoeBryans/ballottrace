import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-7 py-16 text-center text-white sm:px-16">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Bring clarity to election results.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-emerald-50">
          Start organizing, processing and reviewing election results with a
          more structured workflow.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50"
        >
          Get started <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
