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
    Star,
    Camera,
    FileText
} from 'lucide-react';
import ImageUpload from './ImageUpload';

// --- TIPURI DATE ---
type FormData = {
    child_name: string;
    age: string;
    good_deed: string;
    bad_deed: string;
    secret_detail: string;
    wish: string;
    parent_email: string;
    phone: string;
    notes: string;
    images: string[];
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

export default function OrderForm() {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // --- HANDLERS ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        // Validare sumară pentru pasul 1
        if (step === 1) {
            if (!formData.child_name || !formData.age || !formData.good_deed) {
                alert("Te rugăm să completezi numele, vârsta și fapta bună!");
                return;
            }
            setStep(1.5);
        } else if (step === 1.5) {
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step === 2) setStep(1.5);
        else if (step === 1.5) setStep(1);
    };

    const getProgressWidth = () => {
        if (step === 1) return "33%";
        if (step === 1.5) return "66%";
        return "100%";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('orders')
                .insert([formData]);

            if (error) throw error;

            setIsSuccess(true);
        } catch (error: any) {
            console.error('Eroare Supabase:', error);
            alert('Eroare la salvare: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    if (isSuccess) {
        return (
            <div id="comanda" className="w-full max-w-2xl mx-auto bg-card border border-green-500/30 rounded-3xl p-10 shadow-2xl text-center my-10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-green-500 fill-green-500 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Comandă Primită!</h2>
                <p className="text-muted-foreground mb-8">
                    Dosarul pentru <strong>{formData.child_name}</strong> a fost trimis la Polul Nord.<br />
                    Moșul va analiza faptele bune imediat.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-primary font-bold hover:underline"
                >
                    Mai fă o comandă
                </button>
            </div>
        );
    }

    return (
        <section
            id="comanda"
            className="w-full max-w-2xl mx-auto bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300 scroll-mt-24"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground">
                        {step === 1 && 'Pasul 1: Despre Copil'}
                        {step === 1.5 && 'Pasul 2: Magie Vizuală'}
                        {step === 2 && 'Pasul 3: Livrare'}
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">
                        {step === 1 ? '1/3' : step === 1.5 ? '2/3' : '3/3'}
                    </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
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
                                    <label className="text-sm text-muted-foreground ml-1">Numele Copilului *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="child_name"
                                            value={formData.child_name}
                                            onChange={handleChange}
                                            placeholder="ex: Andrei"
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Vârsta *</label>
                                    <div className="relative">
                                        <Sparkles className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="ex: 5 ani"
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground ml-1">Motiv de laudă (Fapta bună) *</label>
                                <div className="relative">
                                    <ThumbsUp className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <textarea
                                        name="good_deed"
                                        value={formData.good_deed}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="ex: A învățat să citească singur"
                                        className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground ml-1">De îmbunătățit</label>
                                <div className="relative">
                                    <ThumbsDown className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <textarea
                                        name="bad_deed"
                                        value={formData.bad_deed}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="ex: Nu vrea să mănânce legume"
                                        className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Detaliu Secret</label>
                                    <input
                                        type="text"
                                        name="secret_detail"
                                        value={formData.secret_detail}
                                        onChange={handleChange}
                                        placeholder="ex: Pisica Luna"
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Dorința</label>
                                    <input
                                        type="text"
                                        name="wish"
                                        value={formData.wish}
                                        onChange={handleChange}
                                        placeholder="ex: LEGO Ninjago"
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-foreground text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-md"
                                >
                                    Continuă <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

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
                                    <h4 className="font-bold text-foreground text-sm">Albumul Magic (Opțional)</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Încarcă poze cu {formData.child_name || 'copilul'} pentru a le include în video.
                                    </p>
                                </div>
                            </div>

                            <ImageUpload onUploadComplete={(urls) => setFormData(prev => ({ ...prev, images: urls }))} />

                            <div className="space-y-2 pt-4">
                                <label className="text-sm text-muted-foreground ml-1 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Alte mențiuni pentru Moșul?
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="ex: Să pronunțe numele 'Matei' mai rar..."
                                    className="w-full bg-background border border-input rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-1/3 bg-transparent border border-input text-muted-foreground font-medium py-3 rounded-xl hover:bg-muted transition-colors"
                                >
                                    Înapoi
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-2/3 bg-foreground text-background font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-md"
                                >
                                    Continuă <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

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
                                    <h4 className="font-bold text-foreground text-sm">Ultimul pas!</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Unde trimitem magia?
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Email Părinte *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="email"
                                            name="parent_email"
                                            value={formData.parent_email}
                                            onChange={handleChange}
                                            required
                                            placeholder="email@exemplu.ro"
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Telefon</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="07xx xxx xxx"
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col-reverse md:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="w-full md:w-1/3 bg-transparent border border-input text-muted-foreground font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Înapoi
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-2/3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Se salvează...
                                        </>
                                    ) : (
                                        <>
                                            Trimite Comanda <CheckCircle className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </form>
        </section>
    );
}