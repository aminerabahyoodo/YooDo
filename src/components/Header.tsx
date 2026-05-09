import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'Solution', id: 'solution' },
    { label: 'Business', id: 'business' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <motion.a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <img src="/logo.jpg" alt="YooDo" className="h-7 sm:h-9 w-7 sm:w-9 rounded-lg object-contain bg-white p-0.5" />
          <span className="text-white font-bold text-lg sm:text-xl tracking-tight">YooDo</span>
        </motion.a>

        <nav className="flex items-center gap-4 sm:gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-white/70 text-xs sm:text-sm font-medium hover:text-white transition-colors duration-200 relative group"
              whileHover={{ y: -1 }}
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
