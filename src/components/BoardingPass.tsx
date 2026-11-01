import { Plane } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../content'
import { usePrefersReducedMotion } from '../hooks/useMotion'

/** Frosted-glass profile card styled as a boarding pass. Tilts gently toward the pointer. */
export function BoardingPass() {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.setProperty('transform', `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`)
  }
  const onLeave = () => cardRef.current?.style.removeProperty('transform')

  const label = 'text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase'

  return (
    <div className="relative mx-auto w-full max-w-md motion-safe:animate-float lg:ml-auto">
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="glass-dark relative overflow-hidden rounded-[28px] text-white transition-transform duration-300 ease-out"
      >
        <div aria-hidden="true" className="absolute -top-20 -right-16 size-48 rounded-full bg-sun/30 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          <div className={`flex items-center justify-between ${label}`}>
            <span>Boarding pass</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 tracking-[0.14em] text-white/80">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
              Open to work
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-4xl leading-none font-bold tracking-tight sm:text-5xl">IDEA</p>
              <p className="mt-2 text-xs text-white/60">Your enquiry</p>
            </div>
            <div aria-hidden="true" className="relative flex flex-1 items-center">
              <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="h-2 w-full text-white/40">
                <line
                  x1="0"
                  y1="4"
                  x2="100"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="motion-safe:animate-dash"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="absolute left-1/2 inline-flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-sun text-navy-deep">
                <Plane className="size-4 rotate-45" />
              </span>
            </div>
            <div className="text-right">
              <p className="font-display text-4xl leading-none font-bold tracking-tight sm:text-5xl">TRIP</p>
              <p className="mt-2 text-xs text-white/60">Your journey</p>
            </div>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
            <div className="col-span-2">
              <dt className={label}>Passenger</dt>
              <dd className="mt-1 font-semibold tracking-wide uppercase">{profile.name}</dd>
            </div>
            <div>
              <dt className={label}>Role</dt>
              <dd className="mt-1 font-medium">{profile.shortRole}</dd>
            </div>
            <div>
              <dt className={label}>Class</dt>
              <dd className="mt-1 font-medium">MBA · Tourism Mgmt</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
