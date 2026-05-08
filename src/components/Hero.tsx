import { useEffect, useRef } from 'react'

/* ── Computational Mesh ── */
function useComputationalMesh(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, animId: number, time = 0

    type NodeKind = 'corner' | 'square' | 'circle' | 'cross' | 'dot'
    type Node = {
      nx: number; ny: number
      kind: NodeKind
      tier: 0 | 1 | 2   // primary / secondary / micro
      size: number; alpha: number
      phase: number; phaseY: number
      rotation: number
      drift: number
      accent: boolean    // Berkeley blue
    }

    // Primary blob is now very wide (sx=0.55, sy=0.52) so the field extends to within ~5% of
    // each edge. The steep k=3.8 keeps the center-right dense while the outer fringe is sparse.
    const BLOBS = [
      { cx: 0.63, cy: 0.49, sx: 0.55, sy: 0.52, w: 1.00, k: 3.8 },  // near-full-canvas primary
      { cx: 0.82, cy: 0.20, sx: 0.20, sy: 0.22, w: 0.64, k: 3.4 },  // upper-right accent
    ]
    const FOCAL = { cx: 0.66, cy: 0.47, sx: 0.096, sy: 0.112 }

    const getDensity = (nx: number, ny: number): number => {
      let d = 0
      for (const b of BLOBS) {
        const dx = (nx - b.cx) / b.sx
        const dy = (ny - b.cy) / b.sy
        d += b.w * Math.exp(-(dx * dx + dy * dy) * b.k)
      }
      return Math.min(1, d)
    }

    const getFocal = (nx: number, ny: number): number => {
      const dx = (nx - FOCAL.cx) / FOCAL.sx
      const dy = (ny - FOCAL.cy) / FOCAL.sy
      return Math.exp(-(dx * dx + dy * dy) * 4.5)
    }

    const nodes: Node[] = []
    const COLS = 46, ROWS = 38
    const CW = 1 / COLS, CH = 1 / ROWS

    let accentRemaining = 3  // max Berkeley blue accents

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const bx = (col + 0.5) / COLS
        const by = (row + 0.5) / ROWS
        const d = getDensity(bx, by)
        if (d < 0.036) continue

        const nSpawn = Math.random() < d * 2.6 ? (Math.random() < d * 0.65 ? 2 : 1) : 0
        for (let k = 0; k < nSpawn; k++) {
          const nx = Math.max(0.01, Math.min(0.99, bx + (Math.random() - 0.5) * CW * 1.3))
          const ny = Math.max(0.01, Math.min(0.99, by + (Math.random() - 0.5) * CH * 1.3))
          const ld = getDensity(nx, ny)
          const lf = getFocal(nx, ny)

          // Tier kept only for connection logic — not for visual differentiation
          const tier: 0 | 1 | 2 = lf > 0.45 ? 0 : ld > 0.55 ? 1 : 2

          const r = Math.random()
          const kind: NodeKind =
            r < 0.38 ? 'corner' :
            r < 0.62 ? 'square' :
            r < 0.78 ? 'circle' :
            r < 0.90 ? 'cross'  : 'dot'

          // All nodes are small, delicate, same visual weight class.
          // Size varies gently with density — no oversized primaries.
          const size =
            kind === 'dot'    ? 1.2 + Math.random() * 1.4 :
            kind === 'circle' ? 1.4 + Math.random() * 2.4 * ld :
            kind === 'corner' ? 2.6 + Math.random() * 3.2 * ld + lf * 2.2 :
            kind === 'cross'  ? 2.0 + Math.random() * 2.4 * ld :
                                1.6 + Math.random() * 2.6 * ld

          // Tier-based alpha cap: focal nodes slightly more present, outer micro-glyphs fainter.
          // Caps are gentle — hierarchy through opacity variation, not bold dark marks.
          const alphaCap = tier === 0 ? 0.58 : tier === 1 ? 0.50 : 0.26
          const alpha = Math.min(alphaCap,
            (0.14 + Math.random() * 0.28) * (0.45 + ld * 0.55) * (1.0 + lf * 0.46)
          )

          // Accent: small, still subtle — just a hint of Berkeley blue in the focal zone
          const accent = lf > 0.52 && accentRemaining > 0 && Math.random() < 0.45
          if (accent) accentRemaining--

          nodes.push({
            nx, ny, kind, tier, size, alpha,
            phase:  Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            rotation: Math.floor(Math.random() * 4),
            drift: 0.40 + Math.random() * 0.60,
            accent,
          })
        }
      }
    }

    const CONN_DIST = 70
    const CONN_DIST_SQ = CONN_DIST * CONN_DIST

    const drawCorner = (x: number, y: number, arm: number, rot: number, lw: number) => {
      ctx.lineWidth = lw
      ctx.beginPath()
      switch (rot % 4) {
        case 0: ctx.moveTo(x + arm, y); ctx.lineTo(x, y); ctx.lineTo(x, y + arm); break  // TL
        case 1: ctx.moveTo(x - arm, y); ctx.lineTo(x, y); ctx.lineTo(x, y + arm); break  // TR
        case 2: ctx.moveTo(x - arm, y); ctx.lineTo(x, y); ctx.lineTo(x, y - arm); break  // BR
        case 3: ctx.moveTo(x + arm, y); ctx.lineTo(x, y); ctx.lineTo(x, y - arm); break  // BL
      }
      ctx.stroke()
    }

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      time += 0.013

      const px = new Float32Array(nodes.length)
      const py = new Float32Array(nodes.length)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        px[i] = n.nx * W
          + Math.sin(time * 0.80 + n.phase)        * 9.0 * n.drift
          + Math.sin(time * 1.55 + n.phase  * 1.7) * 3.5 * n.drift
        py[i] = n.ny * H
          + Math.cos(time * 0.65 + n.phaseY)        * 7.0 * n.drift
          + Math.cos(time * 1.25 + n.phaseY * 1.4)  * 2.5 * n.drift
      }

      // ── Connections: all nodes in moderate+ density, more near focal knot ──
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i]
        if (getDensity(ni.nx, ni.ny) < 0.18) continue

        const maxConn = ni.tier === 0 ? 4 : 3
        let count = 0

        for (let j = i + 1; j < nodes.length; j++) {
          if (count >= maxConn) break
          const nj = nodes[j]
          if (getDensity(nj.nx, nj.ny) < 0.18) continue
          const dx = px[i] - px[j], dy = py[i] - py[j]
          const d2 = dx * dx + dy * dy
          if (d2 > CONN_DIST_SQ) continue
          const dist = Math.sqrt(d2)

          const fBoost = (getFocal(ni.nx, ni.ny) + getFocal(nj.nx, nj.ny)) * 0.5
          // Tier-0 connections read as real structure; focal zone gets extra boost
          const localDense = Math.max(0, (getDensity(ni.nx, ni.ny) - 0.28) / 0.72)
          const la = (1 - dist / CONN_DIST) * Math.min(ni.alpha, nj.alpha)
            * (0.55 + fBoost * 0.55 + localDense * 0.30)
          const isBlue = ni.accent || nj.accent

          ctx.beginPath()
          ctx.moveTo(px[i], py[i])
          ctx.lineTo(px[j], py[j])
          ctx.strokeStyle = isBlue
            ? `rgba(0,40,85,${(la * 0.82).toFixed(3)})`
            : `rgba(85,85,105,${la.toFixed(3)})`
          ctx.lineWidth = fBoost > 0.30 ? 0.58 : localDense > 0.40 ? 0.50 : 0.40
          ctx.stroke()
          count++
        }
      }

      // ── Draw nodes ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const x = px[i], y = py[i]

        // Only fade the extreme canvas edges — fog handles all text-area protection
        const xf = x / W
        const xMult = xf < 0.03 ? xf / 0.03 : 1.0

        const alpha = n.alpha * xMult
        if (alpha < 0.007) continue

        // Focal-zone nodes (tier 0) get a marginally darker gray — just enough to anchor the knot
        const col = n.accent
          ? `rgba(0,46,96,${alpha.toFixed(3)})`
          : n.tier === 0
            ? `rgba(66,66,86,${alpha.toFixed(3)})`
            : `rgba(82,82,102,${alpha.toFixed(3)})`

        ctx.strokeStyle = col
        ctx.fillStyle   = col

        switch (n.kind) {
          case 'dot':
          case 'circle':
            ctx.beginPath()
            ctx.arc(x, y, n.size * 0.5, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'square':
            ctx.fillRect(x - n.size * 0.5, y - n.size * 0.5, n.size, n.size)
            break
          case 'corner':
            drawCorner(x, y, n.size * 0.75, n.rotation, 0.80)
            break
          case 'cross':
            ctx.beginPath()
            ctx.moveTo(x - n.size * 0.5, y); ctx.lineTo(x + n.size * 0.5, y)
            ctx.moveTo(x, y - n.size * 0.5); ctx.lineTo(x, y + n.size * 0.5)
            ctx.lineWidth = 0.68
            ctx.stroke()
            break
        }
      }

      // ── Text-area vignette ──
      // Center (0.13, 0.45) sits inside the subtext + CTA block.
      // High opacity held further out so the mid-range (behind heading) stays well-protected.
      // Tiny fog only over the small subtext + CTA button area — heading bleeds freely
      const fog = ctx.createRadialGradient(W * 0.16, H * 0.64, 0, W * 0.16, H * 0.64, W * 0.20)
      fog.addColorStop(0,    'rgba(255,255,255,0.90)')
      fog.addColorStop(0.45, 'rgba(255,255,255,0.40)')
      fog.addColorStop(0.80, 'rgba(255,255,255,0.05)')
      fog.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.fillStyle = fog
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [ref])
}

/* ── Marquee ── */
const MARQUEE_ITEMS = [
  { main: 'AI Agents', sub: 'Multi-agent systems' },
  { main: 'FPGA Debugging', sub: 'Vivado-style workflows' },
  { main: 'Developer Tools', sub: 'IDE integrations' },
  { main: 'Research Systems', sub: 'Scientific computing' },
  { main: 'Spectral Analysis', sub: 'ALMA datacubes' },
  { main: 'Protoplanetary Disks', sub: 'Astrochemistry' },
  { main: 'Quantum Materials', sub: 'DFT / materials research' },
  { main: 'Full-Stack AI', sub: 'React & FastAPI' },
  { main: 'Python Backends', sub: 'APIs & orchestration' },
  { main: 'Data Science', sub: 'Modeling & analysis' },
  { main: 'LLM Tooling', sub: 'Agent workflows' },
  { main: 'Workflow Automation', sub: 'Calendar + Gmail agents' },
  { main: 'Scientific Python', sub: 'NumPy, pandas, SciPy' },
  { main: 'TypeScript UIs', sub: 'React + Vite' },
  { main: 'Reliable Systems', sub: 'Testing & validation' },
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
        borderTop: '1px solid #e5e5e5',
        height: 60,
        overflow: 'hidden',
        background: '#ffffff',
        zIndex: 12,
      }}
    >
      <div className="marquee-track" style={{ height: '100%', alignItems: 'center' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ marginRight: '2rem' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 18, color: '#3d3d3f', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {item.main}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#b0b0b5', letterSpacing: '0.08em', marginTop: 4, whiteSpace: 'nowrap' }}>
                {item.sub}
              </div>
            </div>
            <span style={{ color: '#d2d2d7', fontSize: 14, marginRight: '2rem', lineHeight: 1, flexShrink: 0 }}>·</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useComputationalMesh(canvasRef)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        background: '#ffffff',
        overflow: 'hidden',
        paddingTop: 64,
      }}
    >
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

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-54%)',
          paddingLeft: 'clamp(32px, 6.5vw, 100px)',
          maxWidth: 'clamp(340px, 46vw, 520px)',
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
          <div style={{ width: 40, height: 1, background: '#d2d2d7', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#98989d', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Developer &amp; Researcher
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 8vw, 118px)',
            lineHeight: 1.0,
            color: '#1d1d1f',
            letterSpacing: '-0.02em',
            marginBottom: 36,
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

        {/* Subtext + buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 24,
            animation: 'fadeInUp 0.5s ease-out 0.5s both',
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#6e6e73', fontWeight: 400, maxWidth: 380, lineHeight: 1.65 }}>
            Data Science @ UC Berkeley
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">View work →</a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}
