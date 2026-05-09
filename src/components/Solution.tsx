import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  'Optimisation du dernier kilomètre',
  'Réduction des retours',
  'Livraison flexible',
  'Réseau collaboratif',
];

function FlowNode({
  label,
  color,
  delay = 0,
}: {
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm font-semibold text-center whitespace-nowrap"
      style={{
        color,
        borderColor: `${color}40`,
        background: `${color}15`,
      }}
    >
      {label}
    </motion.div>
  );
}

function AnimatedDot({ color, reverse = false }: { color: string; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      animate={{ left: reverse ? ['78%', '0%'] : ['0%', '78%'] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      }}
    />
  );
}

// Arrow going left → right
function ArrowRight({ color, width = 'w-16' }: { color: string; width?: string }) {
  return (
    <div className={`relative ${width} h-4 flex items-center`}>
      <div
        className="absolute left-0 right-2 top-1/2 -translate-y-1/2 h-[1px]"
        style={{ background: `linear-gradient(to right, ${color}90, ${color}20)` }}
      />
      <AnimatedDot color={color} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ color }}>
        <svg width="8" height="10" viewBox="0 0 8 10">
          <path d="M0 0 L7 5 L0 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

// Diagonal SVG arrow for desktop (from a source node to the center relay)
function DiagonalArrow({
  color,
  fromBottom = false,
}: {
  color: string;
  fromBottom?: boolean;
}) {
  // Arrow goes from right side of left node to left side of center node
  // fromBottom: arrow goes up-right; else down-right
  const x1 = 0;
  const y1 = fromBottom ? 0 : 60;
  const x2 = 80;
  const y2 = fromBottom ? 60 : 0;

  return (
    <svg
      width="80"
      height="60"
      viewBox="0 0 80 60"
      className="overflow-visible"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <marker
          id={`arrowhead-${color.replace('#', '')}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.7"
        markerEnd={`url(#arrowhead-${color.replace('#', '')})`}
      />
    </svg>
  );
}

function AnimatedFlow() {
  return (
    <div className="w-full flex flex-col gap-8 items-center">

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex items-center justify-center w-full gap-0">

        {/* LEFT COLUMN: two source nodes stacked */}
        <div className="flex flex-col gap-10 items-end">
          <FlowNode label="Société de Livraison"  color="#3b82f6" delay={0.1} />
          <FlowNode label="Livreur Indépendant"   color="#06b6d4" delay={0.2} />
        </div>

        {/* DIAGONAL ARROWS converging to center */}
        <div className="flex flex-col justify-between" style={{ height: '96px', marginLeft: '8px', marginRight: '8px' }}>
          {/* Top arrow: down-right toward relay */}
          <DiagonalArrow color="#3b82f6" fromBottom={false} />
          {/* Bottom arrow: up-right toward relay */}
          <DiagonalArrow color="#06b6d4" fromBottom={true} />
        </div>

        {/* CENTER: Point Relais */}
        <FlowNode label="Point Relais YooDo" color="#f97316" delay={0.4} />

        {/* ARROW right to client */}
        <ArrowRight color="#22c55e" width="w-16" />

        {/* CLIENT */}
        <FlowNode label="Client Final" color="#22c55e" delay={0.6} />
      </div>

      {/* ── MOBILE ── */}
      <div className="flex lg:hidden flex-col items-center gap-5 w-full">

        {/* Société */}
        <div className="flex items-center justify-center gap-2">
          <FlowNode label="Société de Livraison" color="#3b82f6" delay={0.1} />
          <ArrowRight color="#3b82f6" width="w-10" />
        </div>

        {/* Livreur */}
        <div className="flex items-center justify-center gap-2">
          <FlowNode label="Livreur Indépendant" color="#06b6d4" delay={0.2} />
          <ArrowRight color="#06b6d4" width="w-10" />
        </div>

        {/* Point Relais */}
        <FlowNode label="Point Relais YooDo" color="#f97316" delay={0.4} />

        {/* Down arrow */}
        <div className="rotate-90">
          <ArrowRight color="#22c55e" width="w-10" />
        </div>

        {/* Client */}
        <FlowNode label="Client Final" color="#22c55e" delay={0.6} />
      </div>
    </div>
  );
}

export default function Solution() {
  const { ref, inView } = useInView();

  return (
    <section
      id="solution"
      className="py-20 sm:py-24 lg:py-32 bg-[#040810] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(249,115,22,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              La Solution
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">
              L'infrastructure
              <br />
              <span className="text-orange-400">intelligente</span>
            </h2>

            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-150 transition-transform" />
                  <span className="text-white/80 text-sm font-medium">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FLOW */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
            <AnimatedFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
