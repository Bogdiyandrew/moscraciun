'use client';
import { HandCoins, BadgeInfo, Timer, Sparkles } from 'lucide-react'; // Am adaugat Timer si Sparkles
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSnow = () => {
    const flakes = Array.from({ length: 30 });
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {flakes.map((_, i) => {
                const left = (i * 17) % 100;
                const width = 2 + (i % 4);
                const delay = (i * 0.4) % 5;
                const duration = 5 + (i % 5);

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/60 dark:bg-white/40 blur-[1px]"
                        style={{
                            left: `${left}%`,
                            width: `${width}px`,
                            height: `${width}px`,
                            top: -20,
                        }}
                        animate={{
                            y: [0, 800],
                            x: [0, (i % 2 === 0 ? 20 : -20)],
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
    const scrollToForm = () => {
        document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToDespre = () => {
        document.getElementById('despre')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 transition-colors duration-300 pt-24 md:pt-0 overflow-hidden">

            <div className="absolute inset-0 z-0 w-full h-full">
                {/* Imagini Background - Neschimbate */}
                <div className="relative w-full h-full block md:hidden dark:hidden">
                    <Image
                        src="/hero/herobackph.webp"
                        alt="Hero Background Light Mobile"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="relative w-full h-full hidden md:block dark:hidden">
                    <Image
                        src="/hero/herobackground.png"
                        alt="Hero Background Light Desktop"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="relative w-full h-full hidden dark:block dark:md:hidden">
                    <Image
                        src="/hero/herobackph.webp"
                        alt="Hero Background Dark Mobile"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="relative w-full h-full hidden dark:md:block">
                    <Image
                        src="/hero/herobackground.webp"
                        alt="Hero Background Dark Desktop"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>

            <div className="absolute inset-0 z-1 bg-linear-to-b from-white/60 via-white/30 to-white dark:from-black/80 dark:via-black/50 dark:to-background" />

            <div className="absolute inset-0 pointer-events-none z-2">
                <HeroSnow />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-500/10 dark:bg-red-500/5 rounded-full blur-[120px] z-2"
            ></motion.div>

            <div className="text-center max-w-4xl mx-auto relative z-10">

                {/* --- AICI ESTE BANNERUL NOU DE URGENȚĂ --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                    className="inline-flex items-center gap-2 bg-red-600 border border-red-500 px-6 py-3 rounded-full text-sm md:text-base font-bold text-white mb-8 shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:scale-105 transition-transform cursor-default relative overflow-hidden group"
                >
                    {/* Efect de stralucire pe fundalul bannerului */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 animate-shine" />

                    <Timer className="w-5 h-5 text-white animate-pulse relative z-10" />
                    <span className="relative z-10 uppercase tracking-wide">
                        ⚠️ ULTIMELE ORE: Comandă acum pentru livrare diseară!
                    </span>
                </motion.div>
                {/* ----------------------------------------- */}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-extrabold text-foreground tracking-tight mb-8 drop-shadow-sm"
                >
                    Magia Crăciunului <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500 relative">
                        livrată instant.
                        <svg className="absolute -top-6 -right-6 w-12 h-12 text-red-500 rotate-12 hidden md:block" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" opacity="0.2" />
                        </svg>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
                >
                    <span className="bg-red-100 dark:bg-red-900/30 px-2 rounded-md text-red-700 dark:text-red-300 font-bold border border-red-200 dark:border-red-800">
                        Ediție Specială de Ajun
                    </span>
                    <br className="mb-2" />
                    Moș Crăciun înregistrează mesajul video și ți-l trimite pe email în timp ce tu pui cadourile sub brad.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToForm}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] hover:shadow-red-600/80 flex items-center gap-2 cursor-pointer relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">Vreau Video ACUM</span>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToDespre}
                        className="
                            px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer
                            bg-white/80 backdrop-blur-sm text-black hover:bg-white border border-gray-200
                            dark:bg-card/80 dark:text-white dark:border dark:border-border dark:hover:bg-muted
                        "
                    >
                        <BadgeInfo className="w-5 h-5 text-red-500" /> Cum funcționează?
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}