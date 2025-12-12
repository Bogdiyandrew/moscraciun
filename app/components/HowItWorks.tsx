'use client';

import { ClipboardList, Video, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

// --- COMPONENTA DE NINSOARE (Optimizată pentru Vizibilitate) ---
const SnowEffect = () => {
    // Generăm 20 de fulgi
    const flakes = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {flakes.map((_, i) => {
                // Calcule deterministe (fără Math.random) pentru a evita erori de Hydration
                const leftPos = (i * 13) % 100; // Distribuție pe toată lățimea
                const delay = (i * 0.2) % 2;
                const duration = 2 + ((i * 0.4) % 3);
                const size = 3 + (i % 4);

                return (
                    <motion.div
                        key={i}
                        // FIX: Culoare adaptivă. 
                        // Light Mode: Gri foarte deschis (bg-slate-900/10) ca să se vadă pe alb.
                        // Dark Mode: Alb pur (bg-white/70).
                        className="absolute rounded-full bg-slate-900/10 dark:bg-white/70"
                        style={{
                            left: `${leftPos}%`,
                            width: size,
                            height: size,
                            top: -20,
                        }}
                        animate={{
                            y: [0, 400], // Cade în jos
                            x: [0, (i % 2 === 0 ? 20 : -20)], // Oscilează stânga-dreapta
                            opacity: [0, 1, 0], // Fade in/out
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

export default function HowItWorks() {
    const steps = [
        {
            icon: <ClipboardList className="w-8 h-8" />,
            title: "1. Completezi dosarul",
            desc: "Ne spui numele, vârsta și 'secretul' pe care doar Moșul îl știe.",
            // Configurare Temă Roșie
            gradient: "from-red-500/10 via-red-500/5 to-transparent",
            border: "border-red-200 dark:border-red-900",
            iconColor: "text-red-600 dark:text-red-400",
            bgIcon: "bg-red-100 dark:bg-red-900/30",
            bgIconHover: "group-hover:bg-red-200 dark:group-hover:bg-red-900/50"
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "2. Moșul filmează",
            desc: "Înregistrăm mesajul manual în studioul de la Polul Nord.",
            // Configurare Temă Verde
            gradient: "from-green-500/10 via-green-500/5 to-transparent",
            border: "border-green-200 dark:border-green-900",
            iconColor: "text-green-600 dark:text-green-400",
            bgIcon: "bg-green-100 dark:bg-green-900/30",
            bgIconHover: "group-hover:bg-green-200 dark:group-hover:bg-green-900/50"
        },
        {
            icon: <Gift className="w-8 h-8" />,
            title: "3. Primești magia",
            desc: "Primești link-ul pe email. Emoția copilului tău este garantată.",
            // Configurare Temă Aurie
            gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
            border: "border-amber-200 dark:border-amber-900",
            iconColor: "text-amber-600 dark:text-amber-400",
            bgIcon: "bg-amber-100 dark:bg-amber-900/30",
            bgIconHover: "group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="despre" className="py-24 bg-background px-4 overflow-hidden relative">
            {/* Background Glows (lumini ambientale) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Cum funcționează?</h2>
                    <p className="text-muted-foreground text-lg">Simplu, rapid și magic.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            // 'group' permite controlul copiilor (SnowEffect) la hover pe părinte
                            className={`
                                group relative overflow-hidden backdrop-blur-sm
                                border rounded-3xl p-8 shadow-sm 
                                bg-linear-to-br ${step.gradient} ${step.border}
                                hover:shadow-xl transition-all duration-500
                            `}
                        >
                            {/* Componenta de Ninsoare */}
                            <SnowEffect />

                            {/* Cerc decorativ colț (pentru atmosferă) */}
                            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 transition-colors duration-500 ${step.bgIcon} ${step.bgIconHover}`} />

                            <div className={`
                                w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                                transition-colors duration-300 relative z-10
                                ${step.bgIcon} ${step.bgIconHover}
                            `}>
                                <div className={step.iconColor}>
                                    {step.icon}
                                </div>
                            </div>

                            <h3 className="relative z-10 text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="relative z-10 text-muted-foreground leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}