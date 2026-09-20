import type { BlogAuthor } from "../../types/blog";

/**
 * Author block — spec 13 §9: "Autor NO FIM, com uma linha de bio." Sits after
 * the article body, before the related/CTA blocks. Renders nothing when the
 * post has no author object (the 22 old posts stay Organization-only).
 */
export function PostAuthor({ author }: { author: BlogAuthor }) {
  if (!author) return null;

  const initial = author.name?.trim()?.[0]?.toUpperCase() || "K";

  return (
    <div className="mt-12 flex gap-4 items-start border-t border-white/10 pt-8">
      <span className="flex-none w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
        {initial}
      </span>
      <div>
        <p className="text-white text-sm">
          <strong>{author.name}</strong>
          {author.role ? <span className="text-gray-400"> · {author.role}</span> : null}
        </p>
        {author.bio ? <p className="text-gray-500 text-sm mt-1">{author.bio}</p> : null}
      </div>
    </div>
  );
}
