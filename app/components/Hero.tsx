'use client';
import { ChevronDown, PlayCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

// --- Componenta de Ninsoare (Reparată - Fără Hydration Error) ---
const HeroSnow = () => {
    // Generăm 30 de fulgi
    const flakes = Array.from({ length: 30 });

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {flakes.map((_, i) => {
                // FOLOSIM CALCUL DETERMINIST (BAZAT PE INDEX), NU RANDOM
                // Astfel, serverul și clientul calculează exact aceleași valori.
                const left = (i * 17) % 100;      // Distribuție aparent aleatorie pe lățime
                const width = 2 + (i % 4);        // Mărime între 2px și 6px
                const delay = (i * 0.4) % 5;      // Delay
                const duration = 5 + (i % 5);     // Durată cădere

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/60 dark:bg-white/40 blur-[1px]"
                        style={{
                            left: `${left}%`,
                            width: `${width}px`,
                            height: `${width}px`, // Păstrăm proporția rotundă
                            top: -20,
                        }}
                        animate={{
                            y: [0, 800], // Cade până jos
                            x: [0, (i % 2 === 0 ? 20 : -20)], // Oscilează stânga/dreapta
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: delay,
                            ease: "linear",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default function Hero() {
    const { isLoading } = useLoading();

    const scrollToForm = () => {
        document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 bg-background transition-colors duration-300 pt-24 md:pt-0 overflow-hidden">

            {/* Fundal Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-background -z-20" />

            {/* Overlay Protector */}
            <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/40 to-white dark:from-black/80 dark:via-black/40 dark:to-background -z-10 backdrop-blur-[2px]" />

            {/* EFECT DE NINSOARE (SAFE) */}
            <HeroSnow />

            {/* Glow Roșu */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoading ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-500/10 dark:bg-red-500/5 rounded-full blur-[120px] -z-10"
            ></motion.div>

            <div className="text-center max-w-4xl mx-auto relative z-10">

                {/* Badge Marketing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 px-5 py-2 rounded-full text-sm font-bold text-red-600 dark:text-red-400 mb-8 shadow-sm hover:scale-105 transition-transform cursor-default"
                >
                    <Star className="w-4 h-4 fill-current animate-[spin_3s_linear_infinite]" />
                    <span>Oficial: Lista lui Moșu&apos; e deschisă</span>
                </motion.div>

                {/* Titlu */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-extrabold text-foreground tracking-tight mb-8 drop-shadow-sm"
                >
                    Magia Crăciunului <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500 relative">
                        personalizatǎ.
                        <svg className="absolute -top-6 -right-6 w-12 h-12 text-red-500 rotate-12 hidden md:block" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" opacity="0.2" />
                        </svg>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Moș Crăciun înregistrează un mesaj video unic pentru copilul tău.
                    Fără roboți, doar <span className="font-semibold text-foreground">emoție pură</span>.
                </motion.p>

                {/* Butoane */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToForm}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)] hover:shadow-red-600/50 flex items-center gap-2 cursor-pointer relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">Comandă <ChevronDown className="w-5 h-5" /></span>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer
                            bg-black text-dark hover:bg-gray-800 border-transparent
                            dark:bg-card dark:text-dark dark:border dark:border-border dark:hover:bg-muted
                        "
                    >
                        <PlayCircle className="w-5 h-5 text-red-500" /> Vezi exemplu
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}