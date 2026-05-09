import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Linkedin, Twitter } from 'lucide-react';

const founders = [
  {
    name: 'Mohammed Amine Rabah',
    role: 'Co-Fondateur',
    initials: 'MA',
    color: '#f97316',
  },
  {
    name: 'Yassine Haddad',
    role: 'Co-Fondateur',
    initials: 'YH',
    color: '#3b82f6',
  },
];

export default function Founders() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(59,130,246,0.06),transparent)]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            L'Équipe
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Les <span className="text-blue-400">Fondateurs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-transparent backdrop-blur-md overflow-hidden group"
            >
              {/* Animated border glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${f.color}15, transparent 70%)` }}
              />
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }}
              />

              {/* Avatar */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-6 relative"
                style={{ background: `linear-gradient(135deg, ${f.color}30, ${f.color}10)`, border: `1.5px solid ${f.color}40` }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {f.initials}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: `1px solid ${f.color}` }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5 }}
                />
              </motion.div>

              <h3 className="text-white font-bold text-xl mb-1">{f.name}</h3>
              <p className="text-white/40 text-sm font-medium mb-6">{f.role}</p>

              <div className="flex items-center justify-center gap-3">
                {[Linkedin, Twitter].map((Icon, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 cursor-pointer hover:border-white/20 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/50" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
