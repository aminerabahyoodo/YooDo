import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const features = [
  'Optimisation du dernier kilomètre',
  'Réduction des retours',
  'Livraison flexible',
  'Réseau collaboratif',
];

function FlowNode({ label, color, delay = 0 }: { label: string; color: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-semibold text-center whitespace-nowrap"
      style={{ color, borderColor: `${color}40`, background: `${color}15` }}
    >
      {label}
    </motion.div>
  );
}

function VerticalArrow({ color, delay = 0, down = true }: { color: string; delay?: number; down?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-1 py-2"
    >
      <div className="relative w-2 h-16 sm:h-20">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px h-full"
          style={{ background: `linear-gradient(${down ? 'to bottom' : 'to top'}, ${color}80, ${color}30)` }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          animate={down ? { top: ['0%', '80%'] } : { bottom: ['0%', '80%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeIn' }}
        />
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${down ? 'bottom-0' : 'top-0'}`}
          style={{ color }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" className={down ? '' : 'rotate-180'}>
            <path d="M0 0 L5 7 L10 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalArrow({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex items-center gap-2 px-2"
    >
      <div className="relative w-12 sm:w-20 h-4">
        <div
          className="absolute left-0 right-2 top-1/2 -translate-y-1/2 h-px"
          style={{ background: `linear-gradient(to right, ${color}80, ${color}30)` }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          animate={{ left: ['0%', '75%'] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeIn' }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ color }}>
          <svg width="8" height="10" viewBox="0 0 8 10">
            <path d="M0 0 L7 5 L0 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedFlow() {
  return (
    <div className="w-full flex flex-col items-stretch gap-0">
      {/* Row 1: Société de Livraison (left) */}
      <div className="flex items-center">
        <div className="flex-1 flex justify-end pr-2 sm:pr-4">
          <FlowNode label="Société de Livraison" color="#3b82f6" delay={0.1} />
        </div>
        <div className="w-8 sm:w-12 flex justify-center">
          <VerticalArrow color="#3b82f6" delay={0.3} down={true} />
        </div>
        <div className="flex-1" />
      </div>

      {/* Row 2: Point Relais (center) -> Client Final (right) */}
      <div className="flex items-center">
        <div className="flex-1" />
        <div className="flex justify-center pr-2 sm:pr-4">
          <FlowNode label="Point Relais YooDo" color="#f97316" delay={0.4} />
        </div>
        <HorizontalArrow color="#f97316" delay={0.6} />
        <div className="flex justify-start pl-2 sm:pl-4">
          <FlowNode label="Client Final" color="#22c55e" delay={0.7} />
        </div>
      </div>

      {/* Row 3: Livreur Indépendant (left) */}
      <div className="flex items-center">
        <div className="flex-1 flex justify-end pr-2 sm:pr-4">
          <FlowNode label="Livreur Indépendant" color="#06b6d4" delay={0.2} />
        </div>
        <div className="w-8 sm:w-12 flex justify-center">
          <VerticalArrow color="#06b6d4" delay={0.5} down={false} />
        </div>
        <div className="flex-1" />
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
