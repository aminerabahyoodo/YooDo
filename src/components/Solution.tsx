import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  'Optimisation du dernier kilomètre',
  'Réduction des retours',
  'Livraison flexible',
  'Réseau collaboratif',
];

function AnimatedFlow() {
  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden lg:block relative h-96">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g>
            <path d="M 20 15 C 35 15, 35 45, 50 45" stroke="#3b82f6" strokeWidth="0.4" fill="none" opacity="0.3" />
            <motion.path d="M 20 15 C 35 15, 35 45, 50 45" stroke="#3b82f6" strokeWidth="0.8" fill="none" filter="url(#glow)" strokeDasharray="8 40" animate={{ strokeDashoffset: [-48, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} />
          </g>

          <g>
            <path d="M 20 75 C 35 75, 35 45, 50 45" stroke="#06b6d4" strokeWidth="0.4" fill="none" opacity="0.3" />
            <motion.path d="M 20 75 C 35 75, 35 45, 50 45" stroke="#06b6d4" strokeWidth="0.8" fill="none" filter="url(#glow)" strokeDasharray="8 40" animate={{ strokeDashoffset: [-48, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: 0.4 }} />
          </g>

          <g>
            <path d="M 50 45 C 65 45, 65 45, 80 45" stroke="#f97316" strokeWidth="0.4" fill="none" opacity="0.3" />
            <motion.path d="M 50 45 C 65 45, 65 45, 80 45" stroke="#f97316" strokeWidth="0.8" fill="none" filter="url(#glow)" strokeDasharray="8 40" animate={{ strokeDashoffset: [-48, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear', delay: 0.8 }} />
          </g>

          {[
            { x: 20, y: 15, r: 2.5, color: '#3b82f6', delay: 0 },
            { x: 20, y: 75, r: 2.5, color: '#06b6d4', delay: 0.3 },
            { x: 50, y: 45, r: 2.5, color: '#f97316', delay: 0.6 },
            { x: 80, y: 45, r: 2.5, color: '#22c55e', delay: 0.9 },
          ].map((node, i) => (
            <motion.circle key={i} cx={node.x} cy={node.y} r={node.r} fill={node.color} filter="url(#glow)" animate={{ r: [2.5, 3.2, 2.5] }} transition={{ repeat: Infinity, duration: 2, delay: node.delay }} />
          ))}
        </svg>

        {[
          { label: 'Société de\nLivraison', x: '20%', y: '10%', color: '#3b82f6' },
          { label: 'Livreur\nIndépendant', x: '20%', y: '80%', color: '#06b6d4' },
          { label: 'Point Relais\nYooDo', x: '50%', y: '60%', color: '#f97316' },
          { label: 'Client\nFinal', x: '80%', y: '60%', color: '#22c55e' },
        ].map((n, i) => (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            style={{ left: n.x, top: n.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border whitespace-pre-line leading-tight"
              style={{ color: n.color, borderColor: `${n.color}40`, background: `${n.color}15` }}
            >
              {n.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {[
          { label: 'Société de Livraison', color: '#3b82f6', icon: '📦' },
          { label: 'Livreur Indépendant', color: '#06b6d4', icon: '🚴' },
          { label: 'Point Relais YooDo', color: '#f97316', icon: '📍' },
          { label: 'Client Final', color: '#22c55e', icon: '👤' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm"
            style={{ borderColor: `${item.color}40`, background: `${item.color}15` }}
          >
            <div className="text-2xl flex-shrink-0">{item.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: item.color }}>
                {item.label}
              </div>
              {i < 3 && (
                <div className="text-xs mt-1 flex items-center gap-1" style={{ color: `${item.color}80` }}>
                  <span>↓</span> Vers étape suivante
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
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
