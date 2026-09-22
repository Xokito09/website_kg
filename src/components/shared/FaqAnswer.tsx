/**
 * FaqAnswer — renders a FAQ answer string, honouring paragraph breaks.
 *
 * FAQ answers are plain strings, and until spec 13 every one of them was a
 * single paragraph, so the accordions rendered the string as a bare text node.
 * The entity answers added by spec 13 are two paragraphs joined with "\n\n";
 * as a text node the browser collapses that break and the reader gets one wall
 * of text.
 *
 * This splits on "\n\n" and emits one <p> per paragraph. A single-paragraph
 * answer returns the bare string exactly as before, so nothing about the 60+
 * existing answers changes — not the DOM, not the spacing.
 *
 * It renders a fragment, not a wrapper: each accordion keeps its own answer
 * container with its own padding, text tokens and the data-speakable attribute
 * that the FAQ_SPEAKABLE selector in seoSchemas.ts matches on. Moving
 * data-speakable would silently break voice/answer-engine extraction.
 *
 * Paragraph gap is mb-3 on every paragraph but the last; Tailwind's preflight
 * zeroes <p> margins, so without it the paragraphs would sit flush.
 */
export function FaqAnswer({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");

  // Single-paragraph answers: identical output to before this component existed.
  if (paragraphs.length === 1) return <>{text}</>;

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={i < paragraphs.length - 1 ? "mb-3" : undefined}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
