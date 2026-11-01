import { SHOW_PLACEHOLDERS, splitPlaceholders, stripPlaceholders } from '../../lib/placeholder'

/**
 * Renders content text. In development, [placeholder] segments are highlighted;
 * on the live site they are removed. Output is plain React text — never raw HTML.
 */
export function Text({ children }: { children: string }) {
  if (!SHOW_PLACEHOLDERS) return <>{stripPlaceholders(children)}</>
  const parts = splitPlaceholders(children)
  return (
    <>
      {parts.map((part, index) =>
        part.isPlaceholder ? (
          <span key={index} className="placeholder-text" data-placeholder="">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  )
}
