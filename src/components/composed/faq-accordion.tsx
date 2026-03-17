"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="bg-white border border-neutral-200 rounded-xl overflow-hidden data-[state=open]:shadow-card transition-shadow"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-neutral-900 font-medium hover:text-primary transition-colors group">
              <span className="pr-4">{item.question}</span>
              <ChevronDown className="h-5 w-5 text-neutral-500 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="px-6 pb-4 text-neutral-600 leading-relaxed">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
