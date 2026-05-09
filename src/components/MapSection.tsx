import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function MapSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-32 bg-[#040810] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Lancement
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            Phase pilote
          </h2>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-orange-400"
          >
            à Oujda
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12"
          >
            <p className="text-white/60 text-lg leading-relaxed">
              Démarrage de notre opération logistique dans la région d'Oujda, marquant le début d'une transformation du secteur.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
