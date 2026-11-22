import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#071d31] px-5 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="text-emerald-400" />
            BallotTrace
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
            A structured platform for collecting, processing, verifying and
            collating election results.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Platform</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#transparency">Transparency</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Account</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/login">Sign in</Link>
            <Link href="/register">Get started</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Information</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="#faq">FAQ</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-slate-500">
        © {currentYear} BallotTrace. All rights reserved.
      </div>
    </footer>
  );
}
