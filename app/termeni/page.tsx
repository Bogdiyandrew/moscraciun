import React from 'react';

export default function TermeniPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-zinc-300">

                <h1 className="text-4xl font-bold text-white border-b border-zinc-800 pb-6">Termeni și Condiții</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Introducere</h2>
                    <p className="leading-relaxed">
                        Bine ați venit pe BiroulMosului.ro. Acest site este operat de <strong>SC VOLTARISS SRL</strong>.
                        Utilizarea site-ului și plasarea comenzilor reprezintă acceptarea necondiționată a acestor termeni.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Serviciul oferit</h2>
                    <p className="leading-relaxed">
                        Comercializăm conținut video digital personalizat. Videoclipurile sunt generate pe baza informațiilor furnizate de client (nume, vârstă, poze, detalii, etc).
                        Clientul este direct responsabil pentru corectitudinea datelor introduse în formularul de comandă.
                    </p>
                </section>

                <section className="space-y-4 bg-red-950/30 border border-red-500/20 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-red-400">3. Politica de retragere și anulare</h2>
                    <p className="font-bold text-white">
                        Excepția de la dreptul de retragere:
                    </p>
                    <p className="leading-relaxed">
                        Conform OUG 34/2014, art. 16, lit. c), sunt exceptate de la dreptul de retragere produsele confecţionate după specificaţiile prezentate de consumator sau personalizate în mod clar.
                    </p>
                    <p className="leading-relaxed">
                        Întrucât videoclipul este creat special pentru copilul dvs. (nume, poze), <strong>comanda nu poate fi anulată și banii nu pot fi returnați odată ce procesul de generare a început.</strong>
                    </p>
                    <p className="text-sm italic text-zinc-400 mt-2">
                        *Dacă însă videoclipul prezintă defecte tehnice sau erori cauzate de noi (ex: pronunție greșită din vina noastră), îl vom refăce gratuit.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Livrare</h2>
                    <p className="leading-relaxed">
                        Livrarea se face exclusiv electronic, pe adresa de email. Termenul estimativ este de 2-24 ore.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Limitarea Răspunderii</h2>
                    <p className="leading-relaxed">
                        Nu ne asumăm răspunderea pentru erori cauzate de introducerea greșită a datelor de către client (ex: scrierea numelui "Mihai" ca "Miha").
                        Verificați cu atenție formularul înainte de plată.În majoritatea cazurilor, și noi verificăm și corectăm datele introduse în cazul introducerii greșite a datelor.
                    </p>
                </section>

            </div>
        </div>
    );
}