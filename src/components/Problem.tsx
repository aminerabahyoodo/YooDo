import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Package, RefreshCw, Truck, MapPin, Clock } from 'lucide-react';

const problems = [
  { icon: MapPin, title: 'Dernier kilomètre coûteux', color: 'text-red-400', glow: 'shadow-red-500/20', border: 'border-red-500/20', bg: 'from-red-500/10 to-transparent' },
  { icon: RefreshCw, title: 'Retours colis élevés', color: 'text-orange-400', glow: 'shadow-orange-500/20', border: 'border-orange-500/20', bg: 'from-orange-500/10 to-transparent' },
  { icon: Truck, title: 'Camions sous-utilisés', color: 'text-blue-400', glow: 'shadow-blue-500/20', border: 'border-blue-500/20', bg: 'from-blue-500/10 to-transparent' },
  { icon: MapPin, title: 'Adresses imprécises', color: 'text-cyan-400', glow: 'shadow-cyan-500/20', border: 'border-cyan-500/20', bg: 'from-cyan-500/10 to-transparent' },
  { icon: Clock, title: 'Temps perdu', color: 'text-amber-400', glow: 'shadow-amber-500/20', border: 'border-amber-500/20', bg: 'from-amber-500/10 to-transparent' },
];

function ProblemCard({ icon: Icon, title, color, glow, border, bg, index }: typeof problems[0] & { index: number }) {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.03, rotateY: 3 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative p-6 rounded-2xl border ${border} bg-gradient-to-br ${bg} bg-[#0a0f1e] backdrop-blur-sm shadow-xl ${glow} cursor-default group`}
    >
      {/* Animated flow line */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100"
        animate={{ scaleX: [0, 1, 0], x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
      />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${bg} border ${border}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-white font-semibold text-base leading-snug">{title}</h3>

      {/* Glow dot */}
      <motion.div
        className={`absolute top-4 right-4 w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`}
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.div>
  );
}

export default function Problem() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(239,68,68,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Le Problème
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            La logistique du dernier kilomètre<br />
            <span className="text-red-400">est brisée.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {problems.map((p, i) => (
            <ProblemCard key={i} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
