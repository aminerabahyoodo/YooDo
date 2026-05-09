import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#040810] border-t border-white/8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 mb-4"
            >
              <img src="/logo.jpg" alt="YooDo" className="h-10 w-10 rounded-xl object-contain bg-white p-0.5" />
              <span className="text-white font-bold text-2xl tracking-tight">YooDo</span>
            </motion.div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Marketplace logistique intelligente du Maroc.
            </p>
            <p className="text-orange-400/80 text-xs font-semibold mt-3 tracking-wide">
              You do less. We do more.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-widest">Contact</h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:yoodo@contact.com"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <span className="text-sm">yoodo@contact.com</span>
              </motion.a>
              <motion.a
                href="tel:+212661636059"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-sm">+212 661-636059</span>
              </motion.a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-widest">Suivez-nous</h3>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, color: '#0a66c2' },
                { icon: Twitter, color: '#1d9bf0' },
                { icon: Instagram, color: '#e1306c' },
              ].map(({ icon: Icon, color }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/60" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© 2026 YooDo. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/25 text-xs">Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
