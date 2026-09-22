import { test } from "node:test";
import assert from "node:assert/strict";
import { isoDate } from "./build-blog.mjs";

// 22/09/2026: o publicador escreve `date: 2026-09-22` sem aspas, o YAML entrega
// um Date e o antigo String(...).slice(0, 10) virava "Tue Sep 22": o post ficava
// sem data valida e caia para o fim da lista do blog, que ordena por data.
test("date do frontmatter vira YYYY-MM-DD, venha como Date ou como texto", () => {
  assert.equal(isoDate(new Date(Date.UTC(2026, 8, 22))), "2026-09-22");
  assert.equal(isoDate("2026-09-22"), "2026-09-22");
  assert.equal(isoDate("2026-09-22T10:00:00Z"), "2026-09-22");
});
