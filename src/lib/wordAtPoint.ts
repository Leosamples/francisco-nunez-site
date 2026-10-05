/**
 * The word under a screen point, as a DOM Range — or null when the point isn't
 * actually on a word (margins, line gaps, images, excluded elements).
 *
 * Uses the browser's caret-from-point lookup (caretPositionFromPoint, or the
 * WebKit/Blink caretRangeFromPoint), expands to word boundaries with
 * Intl.Segmenter (regex fallback), then confirms the word's own boxes contain
 * the point, since caret lookups snap to the nearest text even from far away.
 */

const EXCLUDE = '[aria-hidden="true"], [data-cursor="laser"], input, textarea, select, script, style';

type CaretDoc = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  caretRangeFromPoint?: (x: number, y: number) => Range | null;
};

const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(undefined, { granularity: "word" }) : null;

function caretAt(x: number, y: number): { node: Node; offset: number } | null {
  const d = document as CaretDoc;
  if (d.caretPositionFromPoint) {
    const p = d.caretPositionFromPoint(x, y);
    return p ? { node: p.offsetNode, offset: p.offset } : null;
  }
  if (d.caretRangeFromPoint) {
    const r = d.caretRangeFromPoint(x, y);
    return r ? { node: r.startContainer, offset: r.startOffset } : null;
  }
  return null;
}

/** [start, end) spans of word-like segments touching `offset`. */
function wordsAround(text: string, offset: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  if (segmenter) {
    for (const s of segmenter.segment(text)) {
      const end = s.index + s.segment.length;
      if (s.isWordLike && offset >= s.index && offset <= end) out.push([s.index, end]);
      if (s.index > offset) break;
    }
    return out;
  }
  const isWord = (c: string | undefined) => !!c && /[\p{L}\p{N}’'-]/u.test(c);
  let start = offset;
  let end = offset;
  while (start > 0 && isWord(text[start - 1])) start--;
  while (end < text.length && isWord(text[end])) end++;
  if (end > start) out.push([start, end]);
  return out;
}

export function wordAtPoint(x: number, y: number, pad = 2): Range | null {
  const caret = caretAt(x, y);
  if (!caret || caret.node.nodeType !== Node.TEXT_NODE) return null;
  const parent = caret.node.parentElement;
  if (!parent || parent.closest(EXCLUDE)) return null;
  const text = caret.node.textContent ?? "";
  for (const [start, end] of wordsAround(text, caret.offset)) {
    const range = document.createRange();
    range.setStart(caret.node, start);
    range.setEnd(caret.node, end);
    for (const r of range.getClientRects()) {
      if (x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad) return range;
    }
  }
  return null;
}
