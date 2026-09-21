/**
 * Key takeaways — sits right below the post title. Spec 13 §9: "pontos-chave
 * ... leves (sem caixa, empilhados)" — no card/box, just a stacked list with
 * a thin rule on the left (matches the reference molde's .takeaways block).
 * Renders nothing when there are no takeaways, so the 22 old posts are unaffected.
 */
export function PostKeyTakeaways({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border-l-2 border-kaptas-green pl-5 mt-10 mb-12">
      <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500">Key takeaways</p>
      <ul className="list-none m-0 mt-3 grid gap-3.5 text-gray-300 text-base leading-relaxed">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
