import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  'Optimisation du dernier kilomètre',
  'Réduction des retours',
  'Livraison flexible',
  'Réseau collaboratif',
];

function AnimatedFlow() {
  const nodes = [
    { label: 'Société de\nLivraison', x: 20, y: 15, color: '#3b82f6' },
    { label: 'Livreur\nIndépendant', x: 20, y: 75, color: '#06b6d4' },
    { label: 'Point Relais\nYooDo', x: 50, y: 45, color: '#f97316' },
    { label: 'Client\nFinal', x: 80, y: 45, color: '#22c55e' },
  ];

  const paths = [
    { from: 0, to: 2 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ];

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrowBlue" markerWidth="3" markerHeight="2" refX="2.5" refY="1" orient="auto">
            <path d="M 0 0 L 3 1 L 0 2 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrowCyan" markerWidth="3" markerHeight="2" refX="2.5" refY="1" orient="auto">
            <path d="M 0 0 L 3 1 L 0 2 Z" fill="#06b6d4" />
          </marker>
          <marker id="arrowOrange" markerWidth="3" markerHeight="2" refX="2.5" refY="1" orient="auto">
            <path d="M 0 0 L 3 1 L 0 2 Z" fill="#f97316" />
          </marker>
        </defs>

        {paths.map((p, i) => {
          const from = nodes[p.from];
          const to = nodes[p.to];
          const d = `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`;
          const arrowId = ['arrowBlue', 'arrowCyan', 'arrowOrange'][i];
          return (
            <g key={i}>
              <path d={d} stroke={from.color} strokeWidth="0.4" fill="none" opacity="0.3" />
              <motion.path
                d={d}
                stroke={from.color}
                strokeWidth="0.8"
                fill="none"
                filter="url(#glow)"
                strokeDasharray="8 40"
                markerEnd={`url(#${arrowId})`}
                animate={{ strokeDashoffset: [-48, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.5, ease: 'linear', delay: i * 0.4 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels positioned exactly on SVG node coordinates */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <div
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold backdrop-blur-sm border whitespace-pre-line leading-tight"
            style={{ color: n.color, borderColor: `${n.color}40`, background: `${n.color}15` }}
          >
            {n.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Solution() {
  const { ref, inView } = useInView();

  return (
    <section id="solution" className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(249,115,22,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              L'infrastructure<br />
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
            <AnimatedFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
