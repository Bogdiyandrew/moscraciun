import React from 'react';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-zinc-300">

                <h1 className="text-4xl font-bold text-white border-b border-zinc-800 pb-6">Politica Cookies</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Ce sunt cookie-urile?</h2>
                    <p className="leading-relaxed">
                        Cookie-urile sunt fișiere text mici salvate pe dispozitivul dvs. atunci când vizitați site-ul.
                        Ele ne ajută să facem site-ul să funcționeze corect.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Ce cookie-uri folosim?</h2>

                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <h3 className="font-bold text-white mb-2 text-lg">🍪 Cookie-uri Esențiale (Strict Necesare)</h3>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Acestea sunt necesare pentru funcționarea site-ului, procesarea comenzilor și securitatea plăților.
                            Exemple: Stripe (pentru detectarea fraudei și procesarea plății), Supabase (pentru autentificare).
                        </p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <h3 className="font-bold text-white mb-2 text-lg">📊 Cookie-uri Analitice (Opționale)</h3>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Folosim aceste cookie-uri pentru a înțelege câți vizitatori avem pe site (ex: Vercel Analytics).
                            Aceste date sunt anonimizate și nu te identifică personal.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Cum controlez cookie-urile?</h2>
                    <p className="leading-relaxed">
                        Puteți șterge sau bloca cookie-urile din setările browserului dumneavoastră.
                        Totuși, blocarea cookie-urilor esențiale poate face imposibilă finalizarea unei comenzi.
                    </p>
                </section>

            </div>
        </div>
    );
}