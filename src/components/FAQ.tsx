"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";
import JsonLd from "./JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-text hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <svg
          className={clsx(
            "h-5 w-5 shrink-0 text-muted transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-4" : "max-h-0",
        )}
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndex((prev: number | null) => (prev === index ? null : index));
    },
    [],
  );

  if (items.length === 0) return null;

  // FAQ structured data (schema.org)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      <JsonLd data={faqSchema} />
      <div className="rounded-lg border border-border bg-surface px-5">
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
