'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (!sessionId) {
            router.push('/');
            return;
        }

        const verifyOrder = async () => {
            try {
                // Apelăm API-ul nostru intern pentru a verifica plata la Stripe
                const res = await fetch('/api/stripe/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId }),
                });

                if (res.ok) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };

        verifyOrder();
    }, [sessionId, router]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
                <Loader2 className="w-20 h-20 text-red-600 animate-spin" />
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Confirmăm plata cu banca...</h2>
                    <p className="text-muted-foreground mt-2">Te rugăm nu închide această pagină.</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-red-600">A apărut o problemă</h2>
                <p className="text-muted-foreground max-w-md">
                    Nu am putut verifica plata automat. Dacă banii au fost luați, contactează-ne urgent la contact@biroulmosului.ro
                </p>
                <Link href="/contact" className="px-6 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors">
                    Contactează Suportul
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-card border border-green-500/20 p-8 md:p-12 rounded-3xl shadow-2xl text-center"
            >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Comandă Confirmată! 🎅</h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Ho Ho Ho! Plata a fost acceptată. <br />
                    Elfii au primit detaliile și s-au apucat de montaj.
                    Vei primi videoclipul pe email în scurt timp!
                </p>

                <Link
                    href="/"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-red-600/40 hover:-translate-y-1"
                >
                    Înapoi la Site
                </Link>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}