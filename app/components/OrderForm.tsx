'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Gift,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    Mail,
    Phone,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Loader2,
    Camera,
    FileText
} from 'lucide-react';
import ImageUpload from './ImageUpload'; // Asigură-te că ai fișierul ImageUpload.tsx creat

// Tipul datelor (Sincronizat cu Supabase)
type FormData = {
    child_name: string;
    age: string;
    good_deed: string;
    bad_deed: string;
    secret_detail: string;
    wish: string;
    parent_email: string;
    phone: string;
    notes: string;      // Notițe suplimentare (Pasul 1.5)
    images: string[];   // Array de URL-uri poze (Pasul 1.5)
};

const initialData: FormData = {
    child_name: '',
    age: '',
    good_deed: '',
    bad_deed: '',
    secret_detail: '',
    wish: '',
    parent_email: '',
    phone: '',
    notes: '',
    images: [],
};

// Configurare Stripe (Pune link-ul tău aici)
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_..."; // <--- PUNE LINK-UL TĂU AICI

export default function OrderForm() {
    // Folosim numere pentru pași: 1, 1.5, 2
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Gestionare Navigare și Validare
    const handleNext = () => {
        // Validare Pas 1
        if (step === 1) {
            if (!formData.child_name || !formData.age || !formData.good_deed) {
                alert("Te rugăm să completezi câmpurile obligatorii (Nume, Vârstă, Faptă bună)!");
                return;
            }
            setStep(1.5); // Mergem la pasul intermediar
        }
        // Pasul 1.5 este opțional, trecem direct
        else if (step === 1.5) {
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step === 2) setStep(1.5);
        else if (step === 1.5) setStep(1);
    };

    // Calcul Progress Bar
    const getProgressWidth = () => {
        if (step === 1) return "33%";
        if (step === 1.5) return "66%";
        return "100%";
    };

    // --- LOGICA PRINCIPALĂ: SALVARE + REDIRECT STRIPE ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Salvăm în Supabase
            const { data, error } = await supabase
                .from('orders')
                .insert([formData])
                .select() // Important: Ne returnează obiectul creat (ca să luăm ID-ul)
                .single();

            if (error) throw error;

            // 2. Dacă salvarea e ok, luăm ID-ul comenzii
            const orderId = data.id;
            console.log("Comandă salvată cu ID:", orderId);

            // 3. Redirecționăm către Stripe Payment Link
            // Agățăm ID-ul comenzii folosind 'client_reference_id' pentru Webhook
            if (STRIPE_PAYMENT_LINK.includes("http")) {
                window.location.href = `${STRIPE_PAYMENT_LINK}?client_reference_id=${orderId}`;
            } else {
                alert("Comanda salvată! (Dar nu ai setat link-ul de Stripe în cod)");
                setIsSubmitting(false);
            }

        } catch (error: any) {
            console.error('Eroare Supabase:', error);
            alert('A apărut o eroare la salvare: ' + error.message);
            setIsSubmitting(false);
        }
    };

    // Variante Animații Framer Motion
    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">

            {/* Decor fundal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            {/* Header cu Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">
                        {step === 1 && 'Pasul 1: Despre Copil'}
                        {step === 1.5 && 'Pasul 2: Magie Vizuală'}
                        {step === 2 && 'Pasul 3: Livrare'}
                    </h2>
                    <span className="text-sm font-medium text-zinc-400">
                        {step === 1 ? '1/3' : step === 1.5 ? '2/3' : '3/3'}
                    </span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "33%" }}
                        animate={{ width: getProgressWidth() }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={step}>

                    {/* --- PASUL 1: DATE DE BAZĂ --- */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Numele Copilului *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="child_name"
                                            value={formData.child_name}
                                            onChange={handleChange}
                                            placeholder="ex: Andrei"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Vârsta *</label>
                                    <div className="relative">
                                        <Sparkles className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="ex: 5 ani"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400 ml-1">Motiv de laudă (Fapta bună) *</label>
                                <div className="relative">
                                    <ThumbsUp className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                    <textarea
                                        name="good_deed"
                                        value={formData.good_deed}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="ex: A învățat să citească, o ajută pe mami"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400 ml-1">De îmbunătățit (Ce zice Moșul?)</label>
                                <div className="relative">
                                    <ThumbsDown className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                    <textarea
                                        name="bad_deed"
                                        value={formData.bad_deed}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="ex: Nu prea mănâncă legume, nu își strânge jucăriile"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Detaliu Secret</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="secret_detail"
                                            value={formData.secret_detail}
                                            onChange={handleChange}
                                            placeholder="ex: Pisica Luna"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Dorința de Crăciun</label>
                                    <div className="relative">
                                        <Gift className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="wish"
                                            value={formData.wish}
                                            onChange={handleChange}
                                            placeholder="ex: LEGO Ninjago"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                                >
                                    Continuă <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* --- PASUL 1.5: POZE & NOTIȚE --- */}
                    {step === 1.5 && (
                        <motion.div
                            key="step1.5"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1.5}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
                                <Camera className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Albumul Magic (Opțional)</h4>
                                    <p className="text-xs text-zinc-400">
                                        Încarcă poze cu {formData.child_name || 'copilul'} pentru a le include în video.
                                    </p>
                                </div>
                            </div>

                            {/* COMPONENTA DE UPLOAD */}
                            <ImageUpload onUploadComplete={(urls) => setFormData(prev => ({ ...prev, images: urls }))} />

                            {/* Notițe Suplimentare */}
                            <div className="space-y-2 pt-4">
                                <label className="text-sm text-zinc-400 ml-1 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Alte mențiuni pentru Moșul?
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="ex: Cum se pronunță corect numele? Ce să nu menționăm?"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-1/3 bg-transparent border border-zinc-700 text-zinc-300 font-medium py-3 rounded-xl hover:bg-zinc-800 transition-colors"
                                >
                                    Înapoi
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-2/3 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                                >
                                    Continuă <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* --- PASUL 2: LIVRARE --- */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={2}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Ultimul pas!</h4>
                                    <p className="text-xs text-zinc-400 mt-1">
                                        Moșul a notat totul. Unde trimitem rezultatul?
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Email Părinte *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="email"
                                            name="parent_email"
                                            value={formData.parent_email}
                                            onChange={handleChange}
                                            required
                                            placeholder="email@exemplu.ro"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400 ml-1">Telefon</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="07xx xxx xxx"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col-reverse md:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="w-full md:w-1/3 bg-transparent border border-zinc-700 text-zinc-300 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Înapoi
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-2/3 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Procesăm...
                                        </>
                                    ) : (
                                        <>
                                            Plătește & Trimite <CheckCircle className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-center text-xs text-zinc-500 mt-2">
                                Vei fi redirecționat către Stripe pentru plată securizată.
                            </p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </form>
        </div>
    );
}