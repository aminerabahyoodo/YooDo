import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Percent, TrendingUp, Network, Database, Feather } from 'lucide-react';

const models = [
  {
    icon: Percent,
    title: 'Commissions',
    desc: 'Sur chaque livraison via la plateforme',
    color: '#f97316',
    value: '8–12%',
  },
  {
    icon: TrendingUp,
    title: 'Tarification dynamique',
    desc: 'Algorithme de prix en temps réel',
    color: '#3b82f6',
    value: 'Smart',
  },
  {
    icon: Network,
    title: 'Réseau points relais',
    desc: 'Abonnements et frais de gestion',
    color: '#06b6d4',
    value: 'B2B',
  },
  {
    icon: Database,
    title: 'Data logistique',
    desc: 'Insights et analytics premium',
    color: '#22c55e',
    value: 'SaaS',
  },
  {
    icon: Feather,
    title: 'Modèle Asset-Light',
    desc: 'Sans flotte propre — scalable à l\'infini',
    color: '#f59e0b',
    value: '∞',
  },
];

function MiniChart({ color }: { color: string }) {
  const points = [20, 45, 30, 60, 50, 80, 70, 95];
  const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 14 + 4},${100 - y}`).join(' ');

  return (
    <svg className="w-20 h-10" viewBox="0 0 100 100">
      <defs>
        <filter id={`cg-${color}`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={path} fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="200"
        strokeDashoffset="200"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        filter={`url(#cg-${color})`}
      />
    </svg>
  );
}

export default function Business() {
  const { ref, inView } = useInView();

  return (
    <section id="business" className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(249,115,22,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Modèle Business
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Revenue streams<br />
            <span className="text-orange-400">diversifiés</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${m.color}10, transparent 70%)` }} />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ background: `${m.color}15`, borderColor: `${m.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <span className="text-xl font-black" style={{ color: m.color }}>{m.value}</span>
                </div>

                <h3 className="text-white font-bold text-base mb-1">{m.title}</h3>
                <p className="text-white/40 text-xs mb-4">{m.desc}</p>
                <MiniChart color={m.color} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
