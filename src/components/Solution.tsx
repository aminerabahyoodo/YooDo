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
    <svg
      viewBox="0 0 500 200"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <defs>
        <marker id="arr-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Société de Livraison — top-left */}
      <rect x="2" y="20" width="148" height="36" rx="10" fill="#3b82f620" stroke="#3b82f640" strokeWidth="1" />
      <text x="76" y="42" textAnchor="middle" dominantBaseline="central" fill="#3b82f6" fontSize="11" fontWeight="600" fontFamily="inherit">
        Société de Livraison
      </text>

      {/* Livreur Indépendant — bottom-left */}
      <rect x="2" y="144" width="148" height="36" rx="10" fill="#06b6d420" stroke="#06b6d440" strokeWidth="1" />
      <text x="76" y="162" textAnchor="middle" dominantBaseline="central" fill="#06b6d4" fontSize="11" fontWeight="600" fontFamily="inherit">
        Livreur Indépendant
      </text>

      {/* Point Relais YooDo — center */}
      <rect x="176" y="82" width="148" height="36" rx="10" fill="#f9731620" stroke="#f9731640" strokeWidth="1" />
      <text x="250" y="100" textAnchor="middle" dominantBaseline="central" fill="#f97316" fontSize="11" fontWeight="600" fontFamily="inherit">
        Point Relais YooDo
      </text>

      {/* Client Final — right */}
      <rect x="350" y="82" width="148" height="36" rx="10" fill="#22c55e20" stroke="#22c55e40" strokeWidth="1" />
      <text x="424" y="100" textAnchor="middle" dominantBaseline="central" fill="#22c55e" fontSize="11" fontWeight="600" fontFamily="inherit">
        Client Final
      </text>

      {/* Hidden paths for animateMotion */}
      <path id="path-soc" d="M150 38 L174 94" fill="none" stroke="none" />
      <path id="path-liv" d="M150 162 L174 106" fill="none" stroke="none" />
      <path id="path-cli" d="M324 100 L348 100" fill="none" stroke="none" />

      {/* Arrow: Société → Point Relais */}
      <line x1="150" y1="38" x2="175" y2="94" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.6" markerEnd="url(#arr-orange)" />

      {/* Arrow: Livreur → Point Relais */}
      <line x1="150" y1="162" x2="175" y2="106" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.6" markerEnd="url(#arr-orange)" />

      {/* Arrow: Point Relais → Client Final */}
      <line x1="324" y1="100" x2="348" y2="100" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.7" markerEnd="url(#arr-green)" />

      {/* Animated dot: Société → Relais */}
      <circle r="3" fill="#f97316" fillOpacity="0.9">
        <animateMotion dur="1.8s" repeatCount="indefinite">
          <mpath xlinkHref="#path-soc" />
        </animateMotion>
      </circle>

      {/* Animated dot: Livreur → Relais */}
      <circle r="3" fill="#06b6d4" fillOpacity="0.9">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s">
          <mpath xlinkHref="#path-liv" />
        </animateMotion>
      </circle>

      {/* Animated dot: Relais → Client */}
      <circle r="3" fill="#22c55e" fillOpacity="0.9">
        <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.3s">
          <mpath xlinkHref="#path-cli" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export default function Solution() {
  const { ref, inView } = useInView();

  return (
    <section
      id="solution"
      className="py-20 sm:py-24 lg:py-32 bg-[#040810] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(249,115,22,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
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

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8 leading-tight">
              L'infrastructure
              <br />
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

          {/* RIGHT FLOW */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
            <AnimatedFlow />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
