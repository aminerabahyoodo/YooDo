import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const uses = [
  { label: 'Tech & Plateforme', pct: 35, color: '#f97316' },
  { label: 'Réseau Points Relais', pct: 30, color: '#3b82f6' },
  { label: 'Marketing & Growth', pct: 20, color: '#06b6d4' },
  { label: 'Opérations', pct: 15, color: '#22c55e' },
];

export default function Funding() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(249,115,22,0.07),transparent)]" />

      {/* Network background lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 100} y1="0"
            x2={Math.random() * 100} y2="100"
            stroke="#f97316"
            strokeWidth="0.2"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.3 }}
          />
        ))}
      </svg>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Financement
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative inline-block mb-8"
          >
            <div className="text-[clamp(4rem,12vw,8rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 leading-none tracking-tighter">
              150M
            </div>
            <div className="text-2xl font-bold text-white/60 -mt-2">Dirhams</div>
            {/* Glow */}
            <div className="absolute inset-0 blur-3xl bg-orange-500/20 -z-10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Construire l'infrastructure logistique intelligente du Maroc
          </motion.p>

          {/* Use of funds */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uses.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-5 rounded-2xl border border-white/10 bg-white/4 text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <motion.circle
                      cx="18" cy="18" r="14"
                      fill="none"
                      stroke={u.color}
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - u.pct / 100)}`}
                      initial={{ strokeDashoffset: `${2 * Math.PI * 14}` }}
                      animate={inView ? { strokeDashoffset: `${2 * Math.PI * 14 * (1 - u.pct / 100)}` } : {}}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold" style={{ color: u.color }}>{u.pct}%</span>
                  </div>
                </div>
                <div className="text-white/70 text-xs font-medium">{u.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
