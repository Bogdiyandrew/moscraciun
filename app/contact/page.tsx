'use client';

import React from 'react';
import { Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
                                    <h4 className="font-bold text-white">Email (Suport Clienți)</h4>
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
                                    <h4 className="font-bold text-white">Program de Lucru</h4>
                                    <p className="text-zinc-400 text-sm">Luni - Duminică: 09:00 - 22:00</p>
                                    <p className="text-zinc-500 text-xs mt-1">*În Ajun lucrăm non-stop!</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Date Fiscale</h4>
                                    <p className="text-zinc-400 text-sm">SC CODE COMMERCE HUB SRL</p>
                                    <p className="text-zinc-400 text-sm">CUI: 51161206</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-primary" /> Trimite un mesaj
                        </h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Numele Tău</label>
                                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700" placeholder="ex: Popescu Ion" />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                                <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700" placeholder="email@exemplu.ro" />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Mesaj</label>
                                <textarea rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-zinc-700" placeholder="Cu ce te putem ajuta?" />
                            </div>

                            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-[1.02]">
                                Trimite Mesajul <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}