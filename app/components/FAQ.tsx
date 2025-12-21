'use client';
import { useRef } from 'react';
import { HelpCircle, Gift, Clock, ShieldCheck, UserCheck } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ item, index }: { item: any, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const sheenGradient = useTransform(
        mouseX,
        [-0.5, 0.5],
        [
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0) 0%, transparent 100%)",
            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)"
        ]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXRel = (e.clientX - rect.left) / width - 0.5;
        const mouseYRel = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseXRel);
        y.set(mouseYRel);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const getTheme = (i: number) => {
        const themes = [
            { border: "group-hover:border-red-500/50", shadow: "group-hover:shadow-red-500/20", icon: "text-red-500", bg: "bg-red-500/10" },
            { border: "group-hover:border-green-500/50", shadow: "group-hover:shadow-green-500/20", icon: "text-green-500", bg: "bg-green-500/10" },
            { border: "group-hover:border-amber-500/50", shadow: "group-hover:shadow-amber-500/20", icon: "text-amber-500", bg: "bg-amber-500/10" },
            { border: "group-hover:border-blue-500/50", shadow: "group-hover:shadow-blue-500/20", icon: "text-blue-500", bg: "bg-blue-500/10" },
        ];
        return themes[i % themes.length];
    };

    const theme = getTheme(index);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`
                group relative h-full bg-card/80 dark:bg-card/40 backdrop-blur-md 
                border border-border rounded-2xl p-8 
                shadow-lg  transition-colors duration-300 ease-out
                ${theme.border} ${theme.shadow} hover:shadow-2xl
            `}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${theme.bg} flex items-center justify-center mb-6 transition-colors`}>
                    {item.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </div>

            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                style={{ background: sheenGradient }}
            />
        </motion.div>
    );
};

export default function FAQ() {
    const faqs = [
        {
            icon: <Clock className="w-6 h-6 text-red-500" />,
            q: "Cât durează execuția?",
            a: "Spiridușii noștri sunt rapizi! De regulă, primești video-ul pe email între 2 și 24 de ore de la comandă."
        },
        {
            icon: <Gift className="w-6 h-6 text-green-500" />,
            q: "Cum primesc surpriza?",
            a: "Simplu! Vei primi un email cu un link magic și securizat. Poți descărca video-ul sau îl poți arăta direct copilului."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
            q: "Ce fac dacă am greșit un nume?",
            a: "Fără griji! Moșul e înțelegător. Dacă există o greșeală, refacem video-ul gratuit în cel mai scurt timp."
        },
        {
            icon: <UserCheck className="w-6 h-6 text-blue-500" />,
            q: "E cineva real sau un robot?",
            a: "100% Autentic. Nu folosim generatoare automate de voce. Fiecare nume este pronunțat cu emoție reală prin editare avansată."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-background border-t border-border px-4 overflow-hidden relative">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20">
                        Ajutor de la Spiriduși
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                        Întrebări frecvente <HelpCircle className="text-primary hidden md:block" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Tot ce trebuie să știi înainte să comanzi magia.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
                    {faqs.map((item, i) => (
                        <TiltCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}