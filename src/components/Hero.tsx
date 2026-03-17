import { useEffect, useRef } from 'react'

/* ── 3D Neural Sphere Canvas ── */
function useNeuralSphereCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const NODE_COUNT = 280
    const NEIGHBORS = 3
    const FOV = 380

    // Spring physics constants
    const SPRING_RADIUS = 200
    const SPRING_MAX = 18
    const SPRING_LERP = 0.05
    const SPRING_COUNT = 3

    type Node3D = { ox: number; oy: number; oz: number }
    type Edge = { a: number; b: number }
    let nodes3D: Node3D[] = []
    let disp: { x: number; y: number }[] = []
    let edges: Edge[] = []

    let rotY = 0
    let rotX = 0.18
    let dRotY = 0.0025
    let dRotX = 0.0006
    let mouse = { x: -9999, y: -9999 }
    let W = 0, H = 0
    let animId: number
    let lastTime = 0

    // Fibonacci golden-angle sphere distribution
    const buildNodes = () => {
      nodes3D = []
      disp = []
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < NODE_COUNT; i++) {
        const y = 1 - (i / (NODE_COUNT - 1)) * 2
        const r = Math.sqrt(1 - y * y)
        const theta = goldenAngle * i
        nodes3D.push({ ox: r * Math.cos(theta), oy: y, oz: r * Math.sin(theta) })
        disp.push({ x: 0, y: 0 })
      }
    }

    // Nearest-neighbor edges (precomputed once)
    const buildEdges = () => {
      edges = []
      const edgeSet = new Set<string>()
      for (let i = 0; i < NODE_COUNT; i++) {
        const dists: { j: number; d: number }[] = []
        for (let j = 0; j < NODE_COUNT; j++) {
          if (i === j) continue
          const dx = nodes3D[i].ox - nodes3D[j].ox
          const dy = nodes3D[i].oy - nodes3D[j].oy
          const dz = nodes3D[i].oz - nodes3D[j].oz
          dists.push({ j, d: dx * dx + dy * dy + dz * dz })
        }
        dists.sort((a, b) => a.d - b.d)
        for (let k = 0; k < NEIGHBORS; k++) {
          const a = Math.min(i, dists[k].j)
          const b = Math.max(i, dists[k].j)
          const key = `${a}-${b}`
          if (!edgeSet.has(key)) {
            edgeSet.add(key)
            edges.push({ a, b })
          }
        }
      }
    }


    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const project = (x: number, y: number, z: number) => {
      const scale = FOV / (FOV + z)
      return { sx: W * 0.5 + x * scale, sy: H * 0.5 - y * scale, scale }
    }

    const rotate = (ox: number, oy: number, oz: number) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const x = ox * cosY + oz * sinY
      const z0 = -ox * sinY + oz * cosY
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const y = oy * cosX - z0 * sinX
      const z = oy * sinX + z0 * cosX
      return { x, y, z }
    }

    const draw = (now: number) => {
      lastTime = now

      // Constant slow rotation — frame-based so focus/blur can't affect speed
      rotY += 0.0018
      rotX += 0.0005

      ctx.clearRect(0, 0, W, H)

      const R = Math.max(W, H) * 0.46

      // Project all nodes to 2D (base positions, before spring displacement)
      type Projected = { sx: number; sy: number; z: number; idx: number }
      const proj: Projected[] = nodes3D.map((n, idx) => {
        const { x, y, z } = rotate(n.ox * R, n.oy * R, n.oz * R)
        const { sx, sy } = project(x, y, z)
        return { sx, sy, z, idx }
      })

      // ── Spring physics ──
      // Find up to SPRING_COUNT nearest nodes within SPRING_RADIUS
      const mouseActive = mouse.x > -9000
      const nearSet = new Set<number>()

      if (mouseActive) {
        const candidates: { idx: number; dist: number }[] = []
        for (let i = 0; i < NODE_COUNT; i++) {
          const dx = proj[i].sx - mouse.x
          const dy = proj[i].sy - mouse.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < SPRING_RADIUS) candidates.push({ idx: i, dist: d })
        }
        candidates.sort((a, b) => a.dist - b.dist)
        for (let k = 0; k < Math.min(SPRING_COUNT, candidates.length); k++) {
          nearSet.add(candidates[k].idx)
        }
      }

      // Lerp displacements toward targets
      for (let i = 0; i < NODE_COUNT; i++) {
        let targetX = 0
        let targetY = 0
        if (nearSet.has(i)) {
          const dx = mouse.x - proj[i].sx
          const dy = mouse.y - proj[i].sy
          const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const factor = Math.min(SPRING_MAX / d, 1)
          targetX = dx * factor
          targetY = dy * factor
        }
        disp[i].x += (targetX - disp[i].x) * SPRING_LERP
        disp[i].y += (targetY - disp[i].y) * SPRING_LERP
      }

      // Final display positions (base + spring offset)
      const display: Projected[] = proj.map((p, i) => ({
        ...p,
        sx: p.sx + disp[i].x,
        sy: p.sy + disp[i].y,
      }))

      // Painters sort by undisplaced z (back to front)
      const sorted = [...display].sort((a, b) => a.z - b.z)

      // ── Draw edges ──
      for (const e of edges) {
        const pa = display[e.a]
        const pb = display[e.b]
        const zAvg = (pa.z + pb.z) / 2
        const depth = (zAvg + R) / (2 * R)
        const alpha = 0.06 + depth * 0.06
        ctx.beginPath()
        ctx.strokeStyle = `rgba(26,26,26,${alpha.toFixed(3)})`
        ctx.lineWidth = 0.5
        ctx.moveTo(pa.sx, pa.sy)
        ctx.lineTo(pb.sx, pb.sy)
        ctx.stroke()
      }

      // ── Draw nodes ──
      for (const p of sorted) {
        const depth = (p.z + R) / (2 * R)
        const r = depth < 0.5 ? 1 + depth : 2.5 + (depth - 0.5)
        const alpha = 0.04 + depth * 0.66
        ctx.beginPath()
        ctx.strokeStyle = `rgba(26,26,26,${Math.min(alpha, 0.7).toFixed(3)})`
        ctx.lineWidth = 0.7
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 } }
    // Reset lastTime on tab focus so dt doesn't spike after being hidden
    const onVisibility = () => { if (!document.hidden) lastTime = performance.now() }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    buildNodes()
    buildEdges()
    resize()

    lastTime = performance.now()
    animId = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ref])
}

/* ── Marquee ── */
const MARQUEE_ITEMS = [
  { main: 'AI', sub: 'Artificial Intelligence' },
  { main: 'Research', sub: 'Academic & Applied' },
  { main: 'ML Engineering', sub: 'Production Systems' },
  { main: 'Berkeley', sub: 'UC Berkeley' },
  { main: 'Agentic Systems', sub: 'Multi-Agent AI' },
  { main: 'Data Science', sub: 'Analysis & Modeling' },
  { main: 'Systems Design', sub: 'Architecture' },
]

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #e0deda',
        height: 72,
        overflow: 'hidden',
        background: '#f5f4f0',
        zIndex: 12,
      }}
    >
      <div className="marquee-track" style={{ height: '100%', alignItems: 'center' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32, paddingRight: 32 }}>
            <div style={{ width: 1, height: 32, background: '#e0deda', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 26, color: '#0a0a0a', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {item.main}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#9a9a9a', letterSpacing: '0.08em', marginTop: 4, whiteSpace: 'nowrap' }}>
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useNeuralSphereCanvas(canvasRef)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        background: '#f5f4f0',
        overflow: 'hidden',
        paddingTop: 64,
      }}
    >
      {/* Canvas contained to hero section only */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-54%)',
          paddingLeft: 'clamp(32px, 6.5vw, 100px)',
          paddingRight: 'clamp(32px, 6.5vw, 100px)',
          zIndex: 10,
        }}
      >
        {/* Label row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
            animation: 'fadeInUp 0.5s ease-out 0.05s both',
          }}
        >
          <div style={{ width: 40, height: 1, background: '#9a9a9a', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#9a9a9a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Engineer &amp; Researcher
          </span>
        </div>

        {/* Oversized name — two stacked lines */}
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 130px)',
            lineHeight: 1.0,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            marginBottom: 36,
            width: '75vw',
          }}
        >
          {['Aryan', 'Jain'].map((word, i) => (
            <span
              key={i}
              className="word-animate"
              style={{ display: 'block', animationDelay: `${0.1 + i * 0.15}s` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtext + buttons row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 32,
            animation: 'fadeInUp 0.5s ease-out 0.5s both',
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#6b6b6b', fontWeight: 400, maxWidth: 440, lineHeight: 1.65 }}>
            Data Science @ UC Berkeley
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', paddingBottom: 4 }}>
            <a href="#projects" className="btn-primary">View work →</a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}
