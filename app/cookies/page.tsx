import React from 'react';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-zinc-300">

                <h1 className="text-4xl font-bold text-white border-b border-zinc-800 pb-6">Politica privind utilizarea cookie-urilor</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Angajamentul nostru pentru intimitate</h2>
                    <p className="leading-relaxed">
                        La <strong>BiroulMosului.ro</strong>, credem că magia Crăciunului nu are nevoie de date personale.
                        Respectăm intimitatea dumneavoastră și dorim să vă informăm că acest site <strong>NU colectează</strong>,
                        nu stochează și nu vinde date despre utilizatori.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Folosim cookie-uri?</h2>

                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-green-900/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🛡️</span>
                            <h3 className="font-bold text-white text-lg">Nu folosim cookie-uri de urmărire</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Navigarea pe acest site este complet anonimă. Nu folosim:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm text-zinc-400 ml-2 space-y-1">
                            <li>Nu folosim Google Analytics sau alte softuri de analiză a traficului.</li>
                            <li>Nu folosim cookie-uri de marketing sau publicitate.</li>
                            <li>Nu folosim cookie-uri de la terți (Facebook Pixel, etc).</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Preferințe tehnice (local storage)</h2>
                    <p className="leading-relaxed">
                        Singurul element de date salvat pe dispozitivul dumneavoastră este strict tehnic și nu pleacă niciodată de pe dispozitivul dumneavoastră:
                    </p>
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                        <h4 className="font-bold text-white mb-1">Tema (Dark/Light Mode)</h4>
                        <p className="text-sm text-zinc-400">
                            Pentru a ține minte dacă preferați site-ul pe modul Întunecat sau Luminos, browserul salvează o mică notiță (în Local Storage). Aceasta nu conține date personale și servește doar pentru confortul vizual.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Concluzie</h2>
                    <p className="leading-relaxed">
                        Puteți naviga pe BiroulMosului.ro fără griji. Nu există ferestre pop-up ascunse pentru consimțământ deoarece nu avem nimic de ascuns și nimic de urmărit.
                    </p>
                </section>

            </div>
        </div>
    );
}