import { Plus } from "lucide-react";

/**
 * AEOContent — visible, collapsed, at the bottom of the page.
 *
 * Renders a dense paragraph describing the page's entity, service, mechanics,
 * proof points, and contact details, inside a <details> block the reader can
 * open. HTML crawlers and LLM context windows get the paragraph either way,
 * because <details> content is in the DOM whether or not it is expanded.
 *
 * Why it is no longer `sr-only` (changed 2026-09-22):
 * The previous version hid the paragraph with Tailwind's sr-only clip. That is
 * defensible as accessibility content, but it is also indistinguishable from
 * text written for crawlers and not for people — which is exactly the thing
 * Google issues manual actions for. A collapsed <details> is honest: the same
 * text, in the DOM, reachable by anyone who wants it, with nothing hidden from
 * a sighted reader that a crawler can see. It costs nothing in AEO terms and
 * removes the cloaking read entirely.
 *
 * Placement: last block of the page, above the footer. It is a summary of the
 * page, so it belongs after the page, not in front of the hero.
 *
 * Styling reuses the FAQ accordion tokens (same border, radius, hover and text
 * colors) so it reads as part of the existing design system, not a new one.
 *
 * Why a single paragraph:
 * LLMs extract entity context more cleanly from one dense paragraph than from
 * fragmented UI elements. The paragraph names the company, the service, the
 * mechanics, the price model, the proof, the contact — in one place.
 */

interface AEOContentProps {
  /** The dense paragraph for this page. Pull from src/data/aeoContent.ts. */
  paragraph: string;
  /**
   * Accessibility label for the wrapping section. Defaults to a generic
   * "Overview" label; pass a page-specific label for clearer screen-reader UX.
   */
  label?: string;
}

export function AEOContent({ paragraph, label = "Service overview" }: AEOContentProps) {
  return (
    <section aria-label={label} className="px-6 md:px-12 max-w-3xl mx-auto w-full">
      <details className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]">
        <summary className="flex items-center justify-between gap-8 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-lg font-medium text-white group-hover:text-kaptas-green transition-colors">
          Kaptas Global at a glance
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-kaptas-green group-hover:bg-kaptas-green/10 transition-all">
            <Plus className="w-4 h-4 transition-transform group-open:rotate-45" />
          </span>
        </summary>
        <p className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed text-base">{paragraph}</p>
      </details>
    </section>
  );
}
