'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Eroare la trimitere');

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contactează Elfii</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Ai o întrebare despre comanda ta sau vrei să ne transmiți ceva special?
                        Suntem aici să te ajutăm, chiar dacă e agitație mare la Polul Nord.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">


                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6">Informații Directe</h3>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Email (suport clienți)</h4>
                                    <p className="text-zinc-400 text-sm mb-1">Răspundem în aprox. 2-4 ore.</p>
                                    <a href="mailto:contact@biroulmosului.ro" className="text-primary hover:text-red-400 transition-colors">
                                        contact@biroulmosului.ro
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Program de lucru</h4>
                                    <p className="text-zinc-400 text-sm">Luni - Duminică: 09:00 - 22:00</p>
                                    <p className="text-zinc-500 text-xs mt-1">*În Ajun lucrăm non-stop!</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Date fiscale</h4>
                                    <p className="text-zinc-400 text-sm">SC VOLTARISS SRL</p>
                                    <p className="text-zinc-400 text-sm">CUI : 52840230</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-primary" /> Trimite un mesaj
                        </h3>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-64 text-center space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white">Mesaj trimis cu succes!</h4>
                                <p className="text-zinc-400">Spiridușii au preluat mesajul tău. Îți vom răspunde în curând pe email.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-primary hover:underline mt-4 text-sm"
                                >
                                    Trimite alt mesaj
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Numele Tău</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700"
                                        placeholder="ex: Popescu Ion"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700"
                                        placeholder="email@exemplu.ro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Mesaj</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-zinc-700"
                                        placeholder="Cu ce te putem ajuta?"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>A apărut o eroare. Te rugăm să încerci din nou sau să ne scrii direct pe email.</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-[1.02]"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Se trimite...
                                        </>
                                    ) : (
                                        <>
                                            Trimite mesajul <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </div>
    );
}