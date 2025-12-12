import React from 'react';

export default function ConfidentialitatePage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-zinc-300">

                <h1 className="text-4xl font-bold text-white border-b border-zinc-800 pb-6">Politica de Confidențialitate</h1>

                <p className="text-zinc-500">Ultima actualizare: 01.12.2025</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Ce date colectăm?</h2>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        <li><strong>Date părinte:</strong> Adresa de email (pentru livrare), date facturare (dacă e cazul). Nu stocăm datele cardului bancar (acestea sunt procesate exclusiv de Stripe).</li>
                        <li><strong>Date copil:</strong> Prenume, vârstă, oraș, realizări, fotografii încărcate.</li>
                    </ul>
                </section>

                <section className="space-y-4 bg-green-950/30 border border-green-500/20 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-green-400">2. Ștergerea Automată a Datelor</h2>
                    <p className="text-white font-medium">
                        Siguranța copiilor este prioritatea noastră.
                    </p>
                    <p className="leading-relaxed">
                        Videoclipurile generate și fotografiile încărcate sunt stocate pe serverele noastre securizate timp de <strong>30 de zile</strong> pentru a vă permite descărcarea.
                        După această perioadă, sistemul nostru le șterge automat și ireversibil.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Scopul Colectării</h2>
                    <p className="leading-relaxed">
                        Datele sunt colectate exclusiv pentru generarea videoclipului personalizat (Executarea Contractului).
                        Nu vindem datele dvs. către terți și nu le folosim pentru marketing, decât dacă v-ați dat acordul explicit.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Parteneri Terți</h2>
                    <p>
                        Colaborăm cu următorii procesatori de date, care respectă legislația GDPR:
                    </p>
                    <ul className="list-disc pl-5 marker:text-primary space-y-1">
                        <li><strong>Stripe:</strong> Procesare plăți securizate.</li>
                        <li><strong>Supabase:</strong> Stocare baze de date și fișiere (Servere în UE/US cu Privacy Shield).</li>
                        <li><strong>Vercel:</strong> Hosting website.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Drepturile Dvs.</h2>
                    <p className="leading-relaxed">
                        Aveți dreptul de a solicita oricând ștergerea imediată a datelor dvs. printr-un email la contact@biroulmosului.ro.
                    </p>
                </section>

            </div>
        </div>
    );
}