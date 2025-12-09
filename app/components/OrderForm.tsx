'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Star, ShieldCheck } from 'lucide-react';

export default function OrderForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        child_name: '',
        age: '',
        good_deed: '',
        bad_deed: '',
        secret_detail: '',
        wish: '',
        parent_email: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('orders')
            .insert([formData]);

        if (error) {
            alert('Eroare: ' + error.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="py-20 flex items-center justify-center bg-background px-4">
                <div className="text-center max-w-lg bg-card p-10 rounded-3xl border border-border shadow-xl">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Star className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-foreground">Comandă Primită!</h2>
                    <p className="text-muted-foreground mb-6">Spiridușii au preluat datele pentru <strong>{formData.child_name}</strong>.</p>
                    <button onClick={() => window.location.reload()} className="text-primary hover:underline font-medium">
                        Mai fă o comandă
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="comanda" className="py-24 px-4 bg-background">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Completează Dosarul</h2>
                    <p className="text-muted-foreground">Date confidențiale, doar pentru ochii Moșului.</p>
                </div>

                <div className="bg-card border border-border p-6 md:p-10 rounded-3xl shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs border-b border-border pb-2">
                                <Star className="w-4 h-4" /> Pasul 1: Despre Copil
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Numele Copilului</label>
                                    <input required name="child_name" onChange={handleChange} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: Andrei" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Vârsta</label>
                                    <input required name="age" onChange={handleChange} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: 5 ani" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Fapta Bună (Motiv de Laudă)</label>
                                <textarea required name="good_deed" onChange={handleChange} rows={2} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: A împărțit jucăriile..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">De Îmbunătățit</label>
                                <textarea required name="bad_deed" onChange={handleChange} rows={2} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: Nu prea mănâncă legume..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <Star className="w-3 h-3 text-primary" /> Detaliul Secret
                                </label>
                                <input required name="secret_detail" onChange={handleChange} className="w-full bg-muted border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: Numele pisicii..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Dorința de Crăciun</label>
                                <input required name="wish" onChange={handleChange} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="ex: LEGO Ninjago" />
                            </div>
                        </div>

                        <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border pb-2">
                                <ShieldCheck className="w-4 h-4" /> Pasul 2: Livrare
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Email Părinte</label>
                                    <input required type="email" name="parent_email" onChange={handleChange} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="email@exemplu.ro" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Telefon (Opțional)</label>
                                    <input name="phone" onChange={handleChange} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="07xx..." />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-red-700 text-primary-foreground font-bold py-4 rounded-xl text-xl shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-50"
                        >
                            {loading ? 'Se trimite...' : 'Trimite Comanda 🎅'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}