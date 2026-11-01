import type { Photo as PhotoData } from '../../content'

interface PhotoProps {
  photo: PhotoData
  /** `sizes` attribute — how wide the image renders, so the browser picks the right file. */
  sizes: string
  className?: string
  /** Above-the-fold images load eagerly with high priority (LCP). */
  priority?: boolean
  /** Decorative background images get empty alt text. */
  decorative?: boolean
}

/** Responsive, self-hosted WebP image with explicit dimensions (no layout shift). */
export function Photo({ photo, sizes, className, priority = false, decorative = false }: PhotoProps) {
  const largest = photo.widths[photo.widths.length - 1] ?? 1080
  const fallback = photo.widths[Math.min(1, photo.widths.length - 1)] ?? largest
  return (
    <img
      src={`${photo.src}-${fallback}.webp`}
      srcSet={photo.widths.map((w) => `${photo.src}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={largest}
      height={Math.round(largest / photo.aspect)}
      alt={decorative ? '' : photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
    />
  )
}
