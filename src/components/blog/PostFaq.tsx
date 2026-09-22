import { FaqAccordion, type FaqAccordionItem } from "../shared/FaqAccordion";

/**
 * Post FAQ block — same visual component as PricingFAQ (FaqAccordion), fed by
 * the post's own `faq` field. Renders nothing when the post has no faq, so the
 * 22 old posts stay exactly as they are today.
 */
export function PostFaq({ items }: { items: FaqAccordionItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-32">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center mb-10">
        Frequently Asked Questions
      </h2>
      <FaqAccordion items={items} />
    </section>
  );
}
