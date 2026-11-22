"use client";

import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Transparency", href: "#transparency" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071d31]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="#home" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
            <ShieldCheck size={23} />
          </span>
          <span className="text-xl font-bold tracking-tight">BallotTrace</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700"
          >
            Get started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-sm">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-emerald-500 px-4 py-3 text-center font-semibold"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
