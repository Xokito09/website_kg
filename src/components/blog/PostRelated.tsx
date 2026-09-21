import type { BlogRelated } from "../../types/blog";

/**
 * Related reading block — spec 13 §9: block at the end, no source table, no
 * competitor links (the `related` field only ever points at Kaptas Global's
 * own blog). Renders nothing when the post has no related list.
 */
export function PostRelated({ items }: { items: BlogRelated[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-14 border-t border-white/10 pt-7">
      <h2 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Related reading</h2>
      <ul className="list-none p-0 m-0 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="block border border-white/10 rounded-xl px-4 py-4 bg-[#0A0A0A] text-white font-semibold text-sm leading-snug hover:border-kaptas-green transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
