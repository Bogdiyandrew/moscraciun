import { ClipboardList, Video, Gift } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <ClipboardList className="w-8 h-8 text-primary" />,
            title: "1. Completezi Dosarul",
            desc: "Ne spui numele, vârsta și 'secretul' pe care doar Moșul îl știe."
        },
        {
            icon: <Video className="w-8 h-8 text-primary" />,
            title: "2. Moșul Filmează",
            desc: "Înregistrăm mesajul manual în studioul de la Polul Nord."
        },
        {
            icon: <Gift className="w-8 h-8 text-primary" />,
            title: "3. Primești Magia",
            desc: "Primești link-ul pe email. Emoția copilului tău este garantată."
        }
    ];

    return (
        <section id="despre" className="py-24 bg-background px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Cum Funcționează?</h2>
                    <p className="text-muted-foreground text-lg">Simplu, rapid și magic.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-all hover:border-primary/20">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}