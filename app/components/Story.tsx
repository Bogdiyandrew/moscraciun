'use client';
import { motion } from 'framer-motion';
import { Scroll, Heart, Sparkles, Video, UserCheck, Fingerprint } from 'lucide-react';

export default function Story() {
    const features = [
        {
            icon: <Video className="w-8 h-8 text-blue-500" />,
            title: "Dovada video",
            text: "Scrisorile vechi se pierd. Copiii moderni caută dovezi. Oferim singura dovadă pe care un copil digital o înțelege: Moșul vorbindu-i direct, pe ecran.",
            color: "from-blue-500/20 to-blue-500/5",
            border: "group-hover:border-blue-500/50"
        },
        {
            icon: <UserCheck className="w-8 h-8 text-red-500" />,
            title: "100% uman",
            text: "Fără roboți, fără AI generativ rece. Suntem o echipă de oameni reali care editează fiecare zâmbet. Tehnologia doar amplifică emoția, nu o înlocuiește.",
            color: "from-red-500/20 to-red-500/5",
            border: "group-hover:border-red-500/50"
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-amber-500" />,
            title: "Amintire eternă",
            text: "Nu livrăm un simplu fișier MP4. Livrăm momentul acela de uimire pură din dimineața de Crăciun, pe care îl vei păstra în cloud și în suflet pentru totdeauna.",
            color: "from-amber-500/20 to-amber-500/5",
            border: "group-hover:border-amber-500/50"
        }
    ];

    return (
        <section id="povesti" className="py-32 bg-background px-4 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Manifestul Nostru</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                        De ce <span className="text-primary relative inline-block">
                            Biroul Moșului?
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Într-o lume a vitezei, noi am ales să ne oprim și să construim
                        <span className="text-foreground font-semibold"> magie artizanală</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className={`
                                group relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm
                                transition-colors duration-300 hover:shadow-2xl ${item.border}
                            `}
                        >
                            <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.text}
                                </p>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-primary">
                                <Sparkles className="w-5 h-5 animate-pulse" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 p-8 md:p-12 rounded-3xl bg-linear-to-r from-zinc-900 to-zinc-950 border border-zinc-800 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                    <div className="relative z-10">
                        <Heart className="w-12 h-12 text-red-500 mx-auto mb-6 fill-red-500 animate-pulse" />
                        <blockquote className="text-2xl md:text-3xl font-serif text-white italic mb-6">
                            "Nu vindem tehnologie. Vindem sclipirea din ochii copilului tău."
                        </blockquote>
                        <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm tracking-widest uppercase">
                            <span className="w-8 h-px bg-zinc-600"></span>
                            Echipa Biroul Moșului
                            <span className="w-8 h-px bg-zinc-600"></span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}