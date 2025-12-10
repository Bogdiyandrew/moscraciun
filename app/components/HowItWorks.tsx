'use client';
import { ClipboardList, Video, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            icon: <ClipboardList className="w-8 h-8 text-primary" />,
            title: "1. Completezi dosarul",
            desc: "Ne spui numele, vârsta și 'secretul' pe care doar Moșul îl știe."
        },
        {
            icon: <Video className="w-8 h-8 text-primary" />,
            title: "2. Moșul filmează",
            desc: "Înregistrăm mesajul manual în studioul de la Polul Nord."
        },
        {
            icon: <Gift className="w-8 h-8 text-primary" />,
            title: "3. Primești magia",
            desc: "Primești link-ul pe email. Emoția copilului tău este garantată."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
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
        <section id="despre" className="py-24 bg-background px-4">
            <div className="max-w-6xl mx-auto">
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
                            className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all hover:border-primary/20"
                        >
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}