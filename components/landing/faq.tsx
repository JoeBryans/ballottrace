"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "What is BallotTrace?",
    answer:
      "BallotTrace is an election results management platform designed to collect, extract, verify and collate polling-unit election results.",
  },
  {
    question: "How does AI result extraction work?",
    answer:
      "Uploaded result sheets can be processed to extract relevant figures. Extracted information should be reviewed against the original document before verification.",
  },
  {
    question: "Can I track results by polling unit?",
    answer:
      "Yes. Results can be organized by polling unit and associated administrative locations, including LGA and state.",
  },
  {
    question: "Are extracted results automatically verified?",
    answer:
      "No. AI extraction and verification are separate processes. Extracted figures should undergo the required review and validation.",
  },
  {
    question: "Can I export election reports?",
    answer:
      "The platform is designed to support structured result reporting and data exports.",
  },
];

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50 px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="font-semibold text-emerald-600">FAQ</span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {questions.map((item, index) => (
            <div key={item.question} className="rounded-xl border bg-white">
              <button
                onClick={() => setActive(active === index ? null : index)}
                aria-expanded={active === index}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900"
              >
                {item.question}
                <ChevronDown
                  className={`shrink-0 transition ${
                    active === index ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {active === index && (
                <p className="px-5 pb-5 text-sm leading-7 text-slate-500">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
