import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const partnersRow1 = [
  { name: "TechNova", industry: "Yazılım & AI", color: "from-blue-500/20" },
  { name: "GlobalLogistics", industry: "Lojistik", color: "from-purple-500/20" },
  { name: "KayaInsaat", industry: "İnşaat", color: "from-red-500/20" },
  { name: "AksoyHolding", industry: "Yatırım", color: "from-amber-500/20" },
  { name: "YildizYazilim", industry: "Teknoloji", color: "from-emerald-500/20" },
];

const partnersRow2 = [
  { name: "EgeEnerji", industry: "Enerji", color: "from-cyan-500/20" },
  { name: "MaviTeknoloji", industry: "Bilişim", color: "from-indigo-500/20" },
  { name: "ZirveGrup", industry: "Danışmanlık", color: "from-rose-500/20" },
  { name: "ArdaMetal", industry: "Sanayi", color: "from-orange-500/20" },
  { name: "VizyonMedya", industry: "Medya", color: "from-fuchsia-500/20" },
];

const PartnerCard = ({ partner }: { partner: typeof partnersRow1[0] }) => (
  <div className="relative group px-2 py-2">
    <div className={`relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl px-10 py-6 flex flex-col items-center justify-center gap-1 transition-all duration-500 group-hover:border-primary/50 group-hover:bg-white/[0.08]`}>
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <span className="relative z-10 text-2xl md:text-3xl font-black tracking-tighter text-white/40 group-hover:text-white transition-all duration-500">
        {partner.name.toUpperCase()}
      </span>
      <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-white/10 group-hover:text-primary transition-all duration-500">
        {partner.industry}
      </span>
    </div>
  </div>
);

export const PartnersSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const allPartners = [...partnersRow1, ...partnersRow2];

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-[#08080a] relative overflow-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full opacity-50" />
      </div>

      {/* Interactive Spotlight */}
      <motion.div 
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allPartners.map((partner, idx) => (
            <motion.div
              key={`partner-${idx}-${partner.name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <PartnerCard partner={partner} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
    </section>
  );
};
