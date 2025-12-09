import { HelpCircle } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            q: "Cât durează până primesc video-ul?",
            a: "De regulă între 2 și 24 de ore."
        },
        {
            q: "Cum primesc video-ul?",
            a: "Vei primi un email cu un link securizat."
        },
        {
            q: "Ce se întâmplă dacă nu îmi place?",
            a: "Dacă Moșul a greșit un nume sau un detaliu, refacem video-ul gratuit."
        },
        {
            q: "Este un robot sau o persoană reală?",
            a: "Folosim editare umană pentru a crea cel mai realist rezultat."
        }
    ];

    return (
        <section id="faq" className="py-20 bg-background border-t border-border px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                        <HelpCircle className="text-primary" /> Întrebări Frecvente
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                            <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                            <p className="text-muted-foreground text-sm">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}