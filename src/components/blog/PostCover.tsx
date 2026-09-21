import { CoverArt } from "./CoverArt";
import { COVER_MOTIF_LABELS, toCoverMotif } from "../../lib/coverMotifs";
import type { BlogCover } from "../../types/blog";

/**
 * WP-B3b — the automatic illustrated cover (spec 13 §9), on the post page
 * (`variant="page"`, default) and on the blog listing card (`variant="card"`,
 * decision 5: same artwork, compact height matching today's `h-48` card).
 *
 * Order (decision 2, enforced by the caller, not here): `cover` present ->
 * this component with that cover; no `cover` but `featured_image` present ->
 * the old <img>, untouched, this component is not used; neither present ->
 * this component with `cover={null}`, which falls back to the post title and
 * the default motif ("guide").
 *
 * Zero-cost by construction: inline SVG (CoverArt), no image file, no
 * service, fixed aspect-ratio (no layout jump) per decision 4.
 */

interface PostCoverProps {
  cover: BlogCover | null;
  fallbackTitle: string;
  fallbackEyebrow: string;
  variant?: "page" | "card";
}

export function PostCover({ cover, fallbackTitle, fallbackEyebrow, variant = "page" }: PostCoverProps) {
  const eyebrow = cover?.eyebrow || fallbackEyebrow;
  const titleShort = cover?.title_short || fallbackTitle;
  const motif = toCoverMotif(cover?.motif);
  const ariaLabel = `Automatic cover illustration: ${COVER_MOTIF_LABELS[motif]}`;

  if (variant === "card") {
    return (
      <div role="img" aria-label={ariaLabel} className="relative w-full h-48 overflow-hidden bg-[#0c0d0c]">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(90% 120% at 0% 100%, rgba(0,71,255,.22), transparent 60%)" }}
        />
        <CoverArt motif={motif} className="absolute right-0 top-0 h-full w-auto max-w-[60%]" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">{eyebrow}</span>
          <span className="text-base font-bold text-white leading-snug line-clamp-2 max-w-[70%]">{titleShort}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative mt-10 mb-12 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between p-6 md:p-10 aspect-[4/3] sm:aspect-[1200/520] bg-[#0c0d0c]"
      style={{ backgroundImage: "radial-gradient(90% 120% at 0% 100%, rgba(0,71,255,.22), transparent 60%)" }}
    >
      <CoverArt
        motif={motif}
        className="absolute right-0 bottom-0 sm:bottom-auto sm:top-0 h-[58%] sm:h-full w-auto max-w-none sm:max-w-[60%] opacity-60 sm:opacity-100"
      />
      <span className="relative z-10 text-[11px] font-mono uppercase tracking-widest text-gray-400">{eyebrow}</span>
      <span className="relative z-10 text-2xl md:text-4xl font-extrabold leading-tight tracking-tight text-white max-w-[13ch] text-balance">
        {titleShort}
      </span>
      <span className="relative z-10 text-sm font-bold text-white">
        Kaptas <span className="text-kaptas-green">Global</span>
      </span>
    </div>
  );
}
