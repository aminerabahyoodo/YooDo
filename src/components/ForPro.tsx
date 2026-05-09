import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Route, Package2, Layers, Zap, Ban } from 'lucide-react';

const items = [
  { icon: Route, title: 'Optimisation des trajets', color: '#f97316' },
  { icon: Package2, title: 'Camions mieux remplis', color: '#3b82f6' },
  { icon: Layers, title: 'Livraison groupée', color: '#06b6d4' },
  { icon: Zap, title: 'Réduction carburant', color: '#22c55e' },
  { icon: Ban, title: 'Zéro trajet inutile', color: '#f59e0b' },
];

function AnimatedRoad() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#060c1a]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
        <defs>
          <filter id="roadGlow">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Road */}
        <path d="M 0,50 Q 50,30 100,50 Q 150,70 200,50" fill="none" stroke="#1e293b" strokeWidth="12" />
        <path d="M 0,50 Q 50,30 100,50 Q 150,70 200,50" fill="none" stroke="#0f172a" strokeWidth="10" />

        {/* Road markings */}
        <motion.path
          d="M 0,50 Q 50,30 100,50 Q 150,70 200,50"
          fill="none"
          stroke="#f97316"
          strokeWidth="0.8"
          strokeDasharray="8 12"
          animate={{ strokeDashoffset: [-80, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          filter="url(#roadGlow)"
        />

        {/* Truck shape */}
        <motion.g
          animate={{ x: [-30, 230] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <rect x="0" y="44" width="14" height="9" rx="1.5" fill="#3b82f6" opacity="0.9" />
          <rect x="10" y="46" width="5" height="5" rx="0.5" fill="#0f172a" opacity="0.8" />
          <circle cx="3" cy="54" r="1.5" fill="#94a3b8" />
          <circle cx="10" cy="54" r="1.5" fill="#94a3b8" />
        </motion.g>

        {/* Second truck */}
        <motion.g
          animate={{ x: [-30, 230] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
        >
          <rect x="0" y="44" width="14" height="9" rx="1.5" fill="#06b6d4" opacity="0.9" />
          <rect x="10" y="46" width="5" height="5" rx="0.5" fill="#0f172a" opacity="0.8" />
          <circle cx="3" cy="54" r="1.5" fill="#94a3b8" />
          <circle cx="10" cy="54" r="1.5" fill="#94a3b8" />
        </motion.g>

        {/* Destination nodes */}
        {[30, 80, 130, 175].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={i % 2 === 0 ? 35 : 65}
            r="3"
            fill="#f97316"
            filter="url(#roadGlow)"
            animate={{ r: [3, 4.5, 3], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function ForPro() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_50%,rgba(249,115,22,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <AnimatedRoad />

            <div className="grid grid-cols-2 gap-3 mt-4">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/3"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                    <span className="text-white/70 text-xs font-medium">{item.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Professionnels
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Gagner plus,<br />
              <span className="text-orange-400">rouler mieux</span>
            </h2>
            <p className="mt-4 text-white/40 text-lg">Chaque trajet devient rentable.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
