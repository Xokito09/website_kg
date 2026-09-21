import { useId } from "react";
import type { CoverMotif } from "../../lib/coverMotifs";

/**
 * WP-B3b — one decorative SVG illustration per closed motif (src/lib/coverMotifs.ts),
 * in the reference page's style (dark background dots + brand-green glow on the
 * highlighted element). Purely decorative: the parent (PostCover) carries
 * role="img" + aria-label, so every shape here is aria-hidden.
 *
 * Ids are namespaced with useId() because several covers render on the same
 * page at once (the Blog grid) — a static id (as in the reference HTML, which
 * only ever shows one cover) would collide across instances.
 */

interface CoverArtProps {
  motif: CoverMotif;
  className?: string;
}

const GREEN = "#00B356";

export function CoverArt({ motif, className }: CoverArtProps) {
  const uid = useId();
  const dotsId = `${uid}-dots`;
  const glowId = `${uid}-glow`;

  return (
    <svg
      className={className}
      viewBox="0 0 520 400"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={dotsId} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,.13)" />
        </pattern>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(0,179,86,.38)" />
          <stop offset="1" stopColor="rgba(0,179,86,0)" />
        </radialGradient>
      </defs>
      <rect width="520" height="400" fill={`url(#${dotsId})`} />
      <MotifDetail motif={motif} glowId={glowId} uid={uid} />
    </svg>
  );
}

function MotifDetail({ motif, glowId, uid }: { motif: CoverMotif; glowId: string; uid: string }) {
  switch (motif) {
    case "comparison":
      return <Comparison glowId={glowId} uid={uid} />;
    case "list":
      return <ListMotif glowId={glowId} />;
    case "cost":
      return <Cost glowId={glowId} />;
    case "map":
      return <Map glowId={glowId} />;
    case "news":
      return <News glowId={glowId} />;
    case "guide":
    default:
      return <Guide glowId={glowId} />;
  }
}

/** Five profile cards, one highlighted — reference: molde-pagina-referencia.html:147-178. */
function Comparison({ glowId, uid }: { glowId: string; uid: string }) {
  const cardId = `${uid}-card`;
  return (
    <>
      <defs>
        <g id={cardId}>
          <rect width="180" height="96" rx="14" fill="#161816" stroke="rgba(255,255,255,.14)" />
          <circle cx="30" cy="32" r="14" fill="#2b2f2b" />
          <rect x="54" y="22" width="92" height="8" rx="4" fill="#3b403b" />
          <rect x="54" y="38" width="60" height="6" rx="3" fill="#2c302c" />
          <rect x="18" y="64" width="38" height="12" rx="6" fill="#242824" />
          <rect x="62" y="64" width="38" height="12" rx="6" fill="#242824" />
          <rect x="106" y="64" width="38" height="12" rx="6" fill="#242824" />
        </g>
      </defs>
      <use href={`#${cardId}`} x="70" y="26" />
      <use href={`#${cardId}`} x="300" y="64" />
      <use href={`#${cardId}`} x="36" y="146" />
      <use href={`#${cardId}`} x="306" y="196" />
      <circle cx="262" cy="308" r="150" fill={`url(#${glowId})`} />
      <g transform="translate(150 250)">
        <rect width="224" height="118" rx="16" fill="#101a14" stroke={GREEN} strokeWidth="2" />
        <circle cx="36" cy="38" r="17" fill={GREEN} />
        <rect x="66" y="26" width="112" height="9" rx="4.5" fill="#e9f7ef" />
        <rect x="66" y="44" width="74" height="7" rx="3.5" fill="#7fbf9c" />
        <rect x="22" y="78" width="48" height="14" rx="7" fill="rgba(0,179,86,.28)" />
        <rect x="78" y="78" width="48" height="14" rx="7" fill="rgba(0,179,86,.28)" />
        <rect x="134" y="78" width="48" height="14" rx="7" fill="rgba(0,179,86,.28)" />
        <circle cx="212" cy="12" r="16" fill={GREEN} />
        <path d="M205 12 l5 5 l9 -10" fill="none" stroke="#06130b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

/** Numbered ranking, three to five lines, the top one highlighted. */
function ListMotif({ glowId }: { glowId: string }) {
  const rows = [0, 1, 2, 3];
  return (
    <>
      <circle cx="270" cy="90" r="140" fill={`url(#${glowId})`} />
      {rows.map((i) => {
        const y = 60 + i * 84;
        const highlighted = i === 0;
        return (
          <g key={i} transform={`translate(70 ${y})`}>
            <circle cx="18" cy="18" r="18" fill={highlighted ? GREEN : "#2b2f2b"} />
            <text x="18" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill={highlighted ? "#06130b" : "#9aa39a"} fontFamily="monospace">
              {i + 1}
            </text>
            <rect x="52" y="4" width={highlighted ? 300 : 220} height="28" rx="8" fill={highlighted ? "#101a14" : "#161816"} stroke={highlighted ? GREEN : "rgba(255,255,255,.14)"} />
          </g>
        );
      })}
    </>
  );
}

/** Two bars comparing cost/salary values, dollar sign on the taller (highlighted) one. */
function Cost({ glowId }: { glowId: string }) {
  return (
    <>
      <circle cx="300" cy="260" r="150" fill={`url(#${glowId})`} />
      <line x1="60" y1="330" x2="480" y2="330" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
      <rect x="140" y="180" width="90" height="150" rx="10" fill="#161816" stroke="rgba(255,255,255,.14)" />
      <rect x="300" y="90" width="90" height="240" rx="10" fill="#101a14" stroke={GREEN} strokeWidth="2" />
      <circle cx="345" cy="60" r="22" fill={GREEN} />
      <text x="345" y="69" textAnchor="middle" fontSize="24" fontWeight="800" fill="#06130b" fontFamily="monospace">
        $
      </text>
    </>
  );
}

/** A step-by-step path, connected stages, the last one marked done. */
function Guide({ glowId }: { glowId: string }) {
  const steps = [
    { x: 90, y: 300 },
    { x: 190, y: 220 },
    { x: 290, y: 260 },
    { x: 400, y: 150 },
  ];
  const path = steps.map((s, i) => `${i === 0 ? "M" : "L"}${s.x} ${s.y}`).join(" ");
  return (
    <>
      <circle cx="400" cy="150" r="130" fill={`url(#${glowId})`} />
      <path d={path} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      {steps.slice(0, -1).map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="13" fill="#242824" stroke="rgba(255,255,255,.14)" />
      ))}
      <circle cx={steps[3].x} cy={steps[3].y} r="22" fill={GREEN} />
      <path
        d={`M${steps[3].x - 8} ${steps[3].y} l6 6 l11 -12`}
        fill="none"
        stroke="#06130b"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** Two points (US and Brazil) linked by an arc, with a clock for the timezone gap. */
function Map({ glowId }: { glowId: string }) {
  return (
    <>
      <circle cx="260" cy="230" r="150" fill={`url(#${glowId})`} />
      <path d="M90 260 Q260 100 430 220" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />
      <circle cx="90" cy="260" r="14" fill="#2b2f2b" stroke="rgba(255,255,255,.2)" />
      <circle cx="430" cy="220" r="16" fill={GREEN} stroke="#06130b" strokeWidth="2" />
      <g transform="translate(230 300)">
        <circle cx="30" cy="30" r="30" fill="#101a14" stroke={GREEN} strokeWidth="2" />
        <line x1="30" y1="30" x2="30" y2="14" stroke="#e9f7ef" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="30" x2="42" y2="34" stroke="#e9f7ef" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </>
  );
}

/** A document (post/rule) with an alert seal marking a change. */
function News({ glowId }: { glowId: string }) {
  return (
    <>
      <circle cx="280" cy="220" r="150" fill={`url(#${glowId})`} />
      <rect x="130" y="60" width="220" height="290" rx="14" fill="#161816" stroke="rgba(255,255,255,.14)" />
      <rect x="160" y="100" width="140" height="10" rx="5" fill="#3b403b" />
      <rect x="160" y="126" width="160" height="8" rx="4" fill="#2c302c" />
      <rect x="160" y="148" width="160" height="8" rx="4" fill="#2c302c" />
      <rect x="160" y="170" width="110" height="8" rx="4" fill="#2c302c" />
      <rect x="160" y="220" width="160" height="8" rx="4" fill="#2c302c" />
      <rect x="160" y="242" width="130" height="8" rx="4" fill="#2c302c" />
      <circle cx="360" cy="120" r="42" fill={GREEN} stroke="#06130b" strokeWidth="3" />
      <text x="360" y="132" textAnchor="middle" fontSize="34" fontWeight="800" fill="#06130b" fontFamily="monospace">
        !
      </text>
    </>
  );
}
