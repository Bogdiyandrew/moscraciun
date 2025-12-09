'use client';
import { ChevronDown, PlayCircle } from 'lucide-react';

export default function Hero() {
    const scrollToForm = () => {
        document.getElementById('comanda')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 bg-background transition-colors duration-300 pt-24 md:pt-0">

            {/* Decorative Blur (Glow roșu în spate) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

            <div className="text-center max-w-4xl mx-auto">
                {/* Badge 30% */}
                <div className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-sm font-medium text-primary mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Locuri limitate pentru 2024
                </div>

                {/* Titlu 60% */}
                <h1 className="text-5xl md:text-8xl font-extrabold text-foreground tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Magia Crăciunului <br />
                    <span className="text-primary">Personalizată.</span>
                </h1>

                <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    Moș Crăciun înregistrează un mesaj video unic pentru copilul tău.
                    Fără roboți, doar emoție pură.
                </p>

                {/* Butoane 10% */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                    <button
                        onClick={scrollToForm}
                        className="px-8 py-4 bg-primary hover:bg-red-700 text-primary-foreground rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2 transform hover:scale-105"
                    >
                        Comandă Video <ChevronDown className="w-5 h-5" />
                    </button>

                    <button className="px-8 py-4 bg-card hover:bg-muted text-foreground border border-border rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-sm">
                        <PlayCircle className="w-5 h-5 text-primary" /> Vezi Exemplu
                    </button>
                </div>
            </div>
        </section>
    );
}