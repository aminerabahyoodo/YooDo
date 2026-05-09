import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { MapPin, Clock, Radio, Lock, Smile } from 'lucide-react';

const perks = [
  { icon: MapPin, title: 'Point relais proche', color: '#f97316' },
  { icon: Clock, title: 'Retrait flexible', color: '#3b82f6' },
  { icon: Radio, title: 'Tracking temps réel', color: '#06b6d4' },
  { icon: Lock, title: 'Livraison sécurisée', color: '#22c55e' },
  { icon: Smile, title: 'Expérience sans stress', color: '#f59e0b' },
];

function TrackingUI() {
  return (
    <div className="relative p-6 rounded-2xl border border-white/10 bg-[#060c1a] overflow-hidden">
      {/* Fake map background */}
      <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-[#0a1628] border border-white/5">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
          <defs>
            <filter id="trackGlow">
              <feGaussianBlur stdDeviation="1" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Grid streets */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#1e293b" strokeWidth="0.5" />
          ))}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#1e293b" strokeWidth="0.5" />
          ))}

          {/* Route */}
          <motion.path
            d="M 20,80 Q 60,80 80,50 Q 100,20 160,30"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
            filter="url(#trackGlow)"
          />

          {/* Origin */}
          <circle cx="20" cy="80" r="3" fill="#3b82f6" filter="url(#trackGlow)" />

          {/* Destination (relay) */}
          <circle cx="160" cy="30" r="4" fill="#f97316" filter="url(#trackGlow)" />
          <motion.circle
            cx="160" cy="30" r="7"
            fill="none"
            stroke="#f97316"
            strokeWidth="0.8"
            animate={{ r: [7, 14], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />

          {/* Moving package */}
          <motion.circle
            r="2.5"
            fill="#fbbf24"
            filter="url(#trackGlow)"
            animate={{
              cx: [20, 50, 80, 110, 140, 160],
              cy: [80, 75, 50, 35, 32, 30],
            }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          />
        </svg>
      </div>

      {/* Status bar */}
      <div className="space-y-2">
        {['En transit', 'Point relais', 'Prêt à retirer'].map((step, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: i === 1 ? 1 : 0.4 }}
            transition={{ delay: i * 0.5 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-orange-400' : 'bg-white/20'}`}
              animate={i === 1 ? { scale: [1, 1.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <span className={`text-xs font-medium ${i === 1 ? 'text-white' : 'text-white/30'}`}>{step}</span>
            {i === 1 && (
              <span className="ml-auto text-xs text-orange-400 font-semibold">Actuel</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ForClient() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(22,163,74,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Client Final
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              La liberté<br />
              <span className="text-green-400">totale</span>
            </h2>
            <p className="mt-4 text-white/40 text-lg">Le colis attend le client, pas l'inverse.</p>

            <div className="grid grid-cols-1 gap-3 mt-10">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${perk.color}18`, border: `1px solid ${perk.color}30` }}>
                      <Icon className="w-4 h-4" style={{ color: perk.color }} />
                    </div>
                    <span className="text-white/80 text-sm font-medium">{perk.title}</span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: perk.color }} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TrackingUI />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
