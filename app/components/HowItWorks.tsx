'use client';

import { Check, Star, Shield, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const scrollToForm = () => {
        const element = document.getElementById('comanda');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const packages = [
        {
            name: "Scutul magic",
            price: "49 RON",
            description: "Mesajul video clasic, perfect pentru a-i aminti că Moșul veghează.",
            features: [
                "Video personalizat (Nume, Vârstă, Laudă)",
                "Scenariul 'Grinch Atacă'",
                "Calitate Full HD (1080p)",
                "Livrare rapidă",
            ],
            icon: <Shield className="w-6 h-6 text-blue-400" />,
            gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
            border: "border-blue-200 dark:border-blue-900",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            popular: false
        },
        {
            name: "Agent secret",
            price: "89 RON",
            oldPrice: "120 RON",
            description: "Experiența completă. Copilul își vede propria față scanată în sistemul Moșului.",
            features: [
                "Tot ce include pachetul Standard",
                "📸 Scanare biometrică (Apare poza copilului)",
                "📜 Diplomă digitală 'Agent secret'",
                "✨ Calitate 4K",
            ],
            icon: <Zap className="w-6 h-6 text-amber-400" />,
            gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
            border: "border-amber-200 dark:border-amber-500/50",
            buttonColor: "bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
            popular: true
        }
    ];

    return (
        <section id="despre" className="py-24 bg-background px-4 overflow-hidden relative">
            {/* Background Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Alege misiunea</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Fiecare pachet include povestea completă cu Grinch și salvarea Crăciunului.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className={`
                                relative p-8 rounded-3xl border backdrop-blur-sm
                                bg-linear-to-br ${pkg.gradient} ${pkg.border}
                                ${pkg.popular ? 'shadow-2xl shadow-amber-500/10 scale-105 z-10 ring-1 ring-amber-500/20' : 'shadow-sm hover:shadow-xl'}
                                transition-all duration-300 flex flex-col h-full
                            `}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg shadow-amber-500/20 whitespace-nowrap">
                                    <Sparkles className="w-3 h-3 fill-white" /> Cel mai ales de părinți
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-xl bg-background/50 border border-white/10 ${pkg.popular ? 'shadow-amber-500/20' : ''}`}>
                                        {pkg.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
                                </div>
                                <p className="text-muted-foreground text-sm min-h-[40px]">{pkg.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-extrabold text-foreground">{pkg.price}</span>
                                    {pkg.oldPrice && (
                                        <span className="text-lg text-muted-foreground line-through decoration-red-500/50">
                                            {pkg.oldPrice}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                                        <Check className={`w-5 h-5 shrink-0 ${pkg.popular ? 'text-amber-500' : 'text-blue-500'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Aici am adaugat motion.button cu whileHover si whileTap */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToForm}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all 
                                    flex items-center justify-center gap-2 cursor-pointer
                                    ${pkg.buttonColor}
                                `}
                            >
                                {pkg.popular && <Star className="w-4 h-4 fill-white" />}
                                Alege {pkg.name}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-12 opacity-60">
                    *Toate prețurile includ TVA. Plata se face securizat prin Stripe.
                </p>
            </div>
        </section>
    );
}