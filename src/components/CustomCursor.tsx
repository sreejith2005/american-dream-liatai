import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onMouseEnterInteractive = () => {
      if (dotRef.current) {
        dotRef.current.style.transform += ' scale(0)'
        dotRef.current.style.opacity = '0'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '60px'
        ringRef.current.style.height = '60px'
        ringRef.current.style.borderColor = 'transparent'
        ringRef.current.style.backgroundColor = 'rgba(201, 168, 76, 0.15)'
      }
    }

    const onMouseLeaveInteractive = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = '1'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.borderColor = '#C9A84C'
        ringRef.current.style.backgroundColor = 'transparent'
      }
    }

    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.08
      ring.current.y += (mouse.current.y - ring.current.y) * 0.08

      if (ringRef.current) {
        const w = ringRef.current.offsetWidth
        ringRef.current.style.transform = `translate(${ring.current.x - w / 2}px, ${ring.current.y - w / 2}px)`
      }

      rafId.current = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId.current = requestAnimationFrame(lerp)

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]')
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
      observer.disconnect()
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-[#C9A84C]"
        style={{
          width: 8,
          height: 8,
          transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-[#C9A84C]"
        style={{
          width: 40,
          height: 40,
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
    </>
  )
}
