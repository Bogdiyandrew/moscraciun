'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Sparkles, ThumbsUp, ThumbsDown, Mail, Phone,
    ArrowRight, ArrowLeft, CheckCircle, Loader2, Star,
    Camera, FileText, AlertCircle, X, CreditCard,
    MapPin, Building2, Shield, Zap
} from 'lucide-react';
import ImageUpload from './ImageUpload';

type FormData = {
    package: 'standard' | 'premium';
    child_name: string;
    age: string;
    gender: 'boy' | 'girl';
    good_deed: string;
    bad_deed: string;
    secret_detail: string;
    wish: string;
    notes: string;
    images: string[];
    parent_email: string;
    phone: string;
    billing_name: string;
    billing_address: string;
    billing_city: string;
    billing_county: string;
    is_company: boolean;
    company_cui?: string;
    company_reg_com?: string;
    terms_accepted: boolean;
};

const initialData: FormData = {
    package: 'premium',
    child_name: '',
    age: '',
    gender: 'boy',
    good_deed: '',
    bad_deed: '',
    secret_detail: '',
    wish: '',
    notes: '',
    images: [],
    parent_email: '',
    phone: '',
    billing_name: '',
    billing_address: '',
    billing_city: '',
    billing_county: '',
    is_company: false,
    company_cui: '',
    company_reg_com: '',
    terms_accepted: false,
};

export default function OrderForm() {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (validationError) setValidationError(null);
    };

    const handlePackageSelect = (pkg: 'standard' | 'premium') => {
        setFormData(prev => ({ ...prev, package: pkg }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.child_name || !formData.age || !formData.good_deed) {
                setValidationError("Hopa! Spiridușii au nevoie de Nume, Vârstă și Fapta Bună!");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const getProgressWidth = () => {
        return `${(step / 3) * 100}%`;
    };

    // --- LOGICA NOUĂ PENTRU STRIPE ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validări
        if (!formData.parent_email || !formData.billing_name || !formData.billing_address || !formData.billing_city) {
            setValidationError("Te rugăm să completezi toate datele de facturare obligatorii!");
            return;
        }
        if (formData.is_company && !formData.company_cui) {
            setValidationError("Pentru firme, CUI-ul este obligatoriu!");
            return;
        }
        if (!formData.terms_accepted) {
            setValidationError("Trebuie să fii de acord cu Termenii și Condițiile!");
            return;
        }

        setIsSubmitting(true);

        try {
            // 2. Salvăm comanda în Supabase (status: pending_payment)
            const { data: orderData, error: dbError } = await supabase
                .from('orders')
                .insert([{
                    ...formData,
                    status: 'pending_payment',
                    amount: formData.package === 'premium' ? 89 : 49,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (dbError) throw dbError;
            if (!orderData) throw new Error("Nu s-a putut crea comanda.");

            console.log("Comanda salvată, inițiem Stripe...");

            // 3. Cerem linkul de plată de la API-ul nostru Stripe
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderData.id,
                    packageType: formData.package,
                    childName: formData.child_name,
                    parentEmail: formData.parent_email
                }),
            });

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error(responseData.error);
            }

            // 4. Redirecționăm utilizatorul către Stripe
            if (responseData.url) {
                window.location.href = responseData.url;
            } else {
                throw new Error("Nu am primit URL de la Stripe.");
            }

        } catch (error: any) {
            console.error('Eroare procesare:', error);
            setValidationError('Eroare: ' + (error.message || "A apărut o problemă necunoscută"));
            setIsSubmitting(false);
        }
    };
    // ---------------------------------

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <section
            id="comanda"
            className="w-full max-w-2xl mx-auto bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300 scroll-mt-24"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <AnimatePresence>
                {validationError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm rounded-3xl"
                        onClick={() => setValidationError(null)}
                    >
                        <motion.div
                            className="bg-card border-2 border-red-500 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setValidationError(null)}
                                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Atenție! 🎅</h3>
                                <p className="text-sm text-muted-foreground">{validationError}</p>
                                <button
                                    onClick={() => setValidationError(null)}
                                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-lg cursor-pointer"
                                >
                                    Am înțeles!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        {step === 1 && 'Pasul 1: Misiune & Copil'}
                        {step === 2 && 'Pasul 2: Magie vizuală'}
                        {step === 3 && 'Pasul 3: Facturare'}
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">
                        {step}/3
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
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div
                                    onClick={() => handlePackageSelect('standard')}
                                    className={`
                                        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                        ${formData.package === 'standard'
                                            ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10'
                                            : 'border-border hover:border-blue-300 opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    {formData.package === 'standard' && (
                                        <div className="absolute top-2 right-2 text-blue-500"><CheckCircle className="w-5 h-5" /></div>
                                    )}
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield className={`w-5 h-5 ${formData.package === 'standard' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                        <h3 className="font-bold text-foreground">Scutul Magic</h3>
                                    </div>
                                    <p className="text-2xl font-bold text-foreground mb-1">49 RON</p>
                                    <p className="text-xs text-muted-foreground">Video HD • Mesaj Standard</p>
                                </div>

                                <div
                                    onClick={() => handlePackageSelect('premium')}
                                    className={`
                                        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                        ${formData.package === 'premium'
                                            ? 'border-amber-500 bg-amber-500/5 shadow-lg shadow-amber-500/20'
                                            : 'border-border hover:border-amber-300 opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    {formData.package === 'premium' && (
                                        <div className="absolute top-2 right-2 text-amber-500"><CheckCircle className="w-5 h-5" /></div>
                                    )}
                                    <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        RECOMANDAT
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className={`w-5 h-5 ${formData.package === 'premium' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                                        <h3 className="font-bold text-foreground">Agent Secret</h3>
                                    </div>
                                    <p className="text-2xl font-bold text-foreground mb-1">89 RON</p>
                                    <p className="text-xs text-muted-foreground">Video 4K • 📸 Poza Copilului • 📜 Diplomă</p>
                                </div>
                            </div>

                            <hr className="border-border/40" />

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-6 space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Numele copilului *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="child_name"
                                            value={formData.child_name}
                                            onChange={handleChange}
                                            placeholder="ex: Andrei"
                                            className={`w-full bg-background border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none transition-colors ${!formData.child_name && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-3 space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Vârsta *</label>
                                    <div className="relative">
                                        <Sparkles className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="ex: 5 ani"
                                            className={`w-full bg-background border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none transition-colors ${!formData.age && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-3 space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Gen</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-input rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary cursor-pointer"
                                    >
                                        <option value="boy">Băiat</option>
                                        <option value="girl">Fetiță</option>
                                    </select>
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
                                        placeholder="ex: A învățat să citească singur / Împarte jucăriile"
                                        className={`w-full bg-background border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none transition-colors resize-none ${!formData.good_deed && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground ml-1">De îmbunătățit (Fapta rea)</label>
                                <div className="relative">
                                    <ThumbsDown className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <textarea
                                        name="bad_deed"
                                        value={formData.bad_deed}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="ex: Nu vrea să mănânce legume / Nu face ordine"
                                        className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Detaliu Secret (Wow factor)</label>
                                    <input
                                        type="text"
                                        name="secret_detail"
                                        value={formData.secret_detail}
                                        onChange={handleChange}
                                        placeholder="ex: Numele pisicii, jucăria preferată"
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Dorința (Cadoul)</label>
                                    <input
                                        type="text"
                                        name="wish"
                                        value={formData.wish}
                                        onChange={handleChange}
                                        placeholder="ex: LEGO Ninjago"
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-foreground text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-md cursor-pointer"
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
                            {formData.package === 'premium' ? (
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                                    <Camera className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm">Albumul magic (Inclus în premium)</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Încarcă 1-3 poze cu {formData.child_name || 'copilul'}. Acestea vor apărea scanate holografic în video!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 opacity-80">
                                    <Shield className="w-6 h-6 text-blue-500 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm">Pachet Standard</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Ai ales pachetul Standard (fără poze în video).
                                            <span
                                                onClick={() => setStep(1)}
                                                className="underline cursor-pointer font-bold ml-1 hover:text-blue-600"
                                            >
                                                Treci la Premium pentru a adăuga poze?
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {formData.package === 'premium' && (
                                <ImageUpload onUploadComplete={(urls) => setFormData(prev => ({ ...prev, images: urls }))} />
                            )}

                            <div className="space-y-2 pt-4">
                                <label className="text-sm text-muted-foreground ml-1 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Note speciale (pronunție, etc.)
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="ex: Numele se scrie cu 'y' nu cu 'i'. Menționați și cățelul Rex."
                                    className="w-full bg-background border border-input rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-1/3 bg-transparent border border-input text-muted-foreground font-medium py-3 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                                >
                                    Înapoi
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-2/3 bg-foreground text-background font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-md cursor-pointer"
                                >
                                    Spre platǎ <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={3}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className={`border rounded-xl p-4 flex justify-between items-center ${formData.package === 'premium' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Total de plată</p>
                                    <p className="text-xl font-bold text-foreground">{formData.package === 'premium' ? '89 RON' : '49 RON'}</p>
                                    <p className="text-xs opacity-70">Pachet {formData.package === 'premium' ? 'Agent Secret' : 'Scutul Magic'}</p>
                                </div>
                                <CreditCard className={`w-8 h-8 ${formData.package === 'premium' ? 'text-amber-500' : 'text-blue-500'}`} />
                            </div>

                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                                <CreditCard className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">Date facturare</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Necesare pentru emiterea facturii fiscale automate.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Email (unde trimitem video) *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="email"
                                            name="parent_email"
                                            value={formData.parent_email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary"
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
                                            className="w-full bg-background border border-input rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border/50" />

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_company"
                                    name="is_company"
                                    checked={formData.is_company}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="is_company" className="text-sm font-medium text-foreground cursor-pointer select-none">
                                    Facturǎ pe firmǎ (persoana juridicǎ)
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">
                                        {formData.is_company ? 'Denumire Firmă *' : 'Nume și Prenume (Părinte) *'}
                                    </label>
                                    <div className="relative">
                                        {formData.is_company ? (
                                            <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        )}
                                        <input
                                            type="text"
                                            name="billing_name"
                                            value={formData.billing_name}
                                            onChange={handleChange}
                                            placeholder={formData.is_company ? "SC EXEMPLU SRL" : "Popescu Ion"}
                                            className={`w-full bg-background border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none transition-colors ${!formData.billing_name && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground ml-1">Oraș *</label>
                                        <input
                                            type="text"
                                            name="billing_city"
                                            value={formData.billing_city}
                                            onChange={handleChange}
                                            className={`w-full bg-background border rounded-xl py-3 px-4 text-foreground focus:outline-none transition-colors ${!formData.billing_city && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground ml-1">Județ *</label>
                                        <input
                                            type="text"
                                            name="billing_county"
                                            value={formData.billing_county}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-input rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground ml-1">Adresa completǎ (stradǎ, nr) *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="billing_address"
                                            value={formData.billing_address}
                                            onChange={handleChange}
                                            placeholder="Str. Exemplului nr. 1, Bl. A, Ap. 2"
                                            className={`w-full bg-background border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none transition-colors ${!formData.billing_address && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                        />
                                    </div>
                                </div>

                                {formData.is_company && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-2">
                                            <label className="text-sm text-muted-foreground ml-1">CUI *</label>
                                            <input
                                                type="text"
                                                name="company_cui"
                                                value={formData.company_cui}
                                                onChange={handleChange}
                                                placeholder="RO123456"
                                                className={`w-full bg-background border rounded-xl py-3 px-4 text-foreground focus:outline-none transition-colors ${!formData.company_cui && validationError ? 'border-red-500' : 'border-input focus:border-primary'}`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-muted-foreground ml-1">Reg. Com (Opțional)</label>
                                            <input
                                                type="text"
                                                name="company_reg_com"
                                                value={formData.company_reg_com}
                                                onChange={handleChange}
                                                placeholder="J40/..."
                                                className="w-full bg-background border border-input rounded-xl py-3 px-4 text-foreground focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="border-border/50" />

                            <div className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg border border-border/50">
                                <input
                                    type="checkbox"
                                    id="terms_accepted"
                                    name="terms_accepted"
                                    checked={formData.terms_accepted}
                                    onChange={handleChange}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="terms_accepted" className="text-sm text-muted-foreground cursor-pointer select-none leading-tight">
                                    Am citit și sunt de acord cu <a href="/termeni" target="_blank" className="text-primary hover:underline font-semibold">Termenii și Condițiile</a> și cu <a href="/confidentialitate" target="_blank" className="text-primary hover:underline font-semibold">Politica de Confidențialitate</a>.
                                </label>
                            </div>

                            <div className="pt-4 flex flex-col-reverse md:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="w-full md:w-1/3 bg-transparent border border-input text-muted-foreground font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-colors cursor-pointer"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Înapoi
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-600/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Se inițiază plata...
                                        </>
                                    ) : (
                                        <>
                                            Plătește și Finalizează <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
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