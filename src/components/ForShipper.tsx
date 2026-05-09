import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { BarChart3, Users, RotateCcw, Warehouse, Shield } from 'lucide-react';

const cards = [
  { icon: BarChart3, title: 'Comparatif intelligent des sociétés', color: 'text-blue-400', border: 'border-blue-500/25', bg: 'from-blue-500/10' },
  { icon: Users, title: 'Livreurs indépendants flexibles', color: 'text-orange-400', border: 'border-orange-500/25', bg: 'from-orange-500/10' },
  { icon: RotateCcw, title: 'Réduction des retours colis', color: 'text-green-400', border: 'border-green-500/25', bg: 'from-green-500/10' },
  { icon: Warehouse, title: 'Mini-hubs logistiques', color: 'text-cyan-400', border: 'border-cyan-500/25', bg: 'from-cyan-500/10' },
  { icon: Shield, title: 'Protection du stock', color: 'text-amber-400', border: 'border-amber-500/25', bg: 'from-amber-500/10' },
];

export default function ForShipper() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(59,130,246,0.07),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Expéditeur
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Pour l'Expéditeur —<br />
            <span className="text-blue-400">Le luxe du choix</span>
          </h2>
          <p className="mt-4 text-white/40 text-lg">Plus de flexibilité. Moins de pertes.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 rounded-2xl border ${card.border} bg-gradient-to-br ${card.bg} to-transparent bg-[#0a0f1e] group cursor-default relative overflow-hidden`}
              >
                {/* Animated package flowing */}
                <motion.div
                  className="absolute bottom-2 right-2 w-3 h-3 rounded border border-current opacity-20 group-hover:opacity-50"
                  style={{ color: card.color.replace('text-', '') }}
                  animate={{ rotate: [0, 45, 0], scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                />
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${card.bg} to-transparent border ${card.border}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="text-white font-semibold text-base leading-snug">{card.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
