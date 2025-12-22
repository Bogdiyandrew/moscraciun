'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import {
    Camera,
    FileText,
    ExternalLink,
    MapPin,
    CreditCard,
    Building2,
    User,
    Zap,
    Shield,
    CheckCircle,
    Clock
} from 'lucide-react';

// Definim tipul pentru Order ca sa avem autocomplete si sa nu avem erori
type Order = {
    id: number;
    created_at: string;
    status: string;
    package: 'standard' | 'premium';
    amount: number;
    child_name: string;
    age: string;
    gender: string;
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
};

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setOrders(data);
        if (error) console.error("Eroare la fetch:", error);
        setLoading(false);
    };

    const markAsDone = async (id: number) => {
        const confirm = window.confirm("Sigur ai trimis mailul cu video? Marchez comanda ca finalizată?");
        if (!confirm) return;

        const { error } = await supabase
            .from('orders')
            .update({ status: 'completed' })
            .eq('id', id);

        if (!error) fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-4 md:p-8 bg-zinc-950 min-h-screen text-zinc-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        🎅 Admin Comenzi <span className="text-sm bg-primary px-2 py-1 rounded text-white font-normal">Hustle Mode</span>
                    </h1>
                    <button
                        onClick={fetchOrders}
                        className="text-sm text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                        Reîncarcă lista
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 animate-pulse text-zinc-500">Se încarcă comenzile...</div>
                ) : (
                    <div className="grid gap-8">
                        {orders.map((order) => {
                            const isPremium = order.package === 'premium';
                            const isCompleted = order.status === 'completed';

                            return (
                                <div
                                    key={order.id}
                                    className={`relative bg-zinc-900 rounded-xl border overflow-hidden transition-all duration-300
                                        ${isCompleted
                                            ? 'border-green-900/50 opacity-60 hover:opacity-100'
                                            : 'border-zinc-700 shadow-xl shadow-black/50'
                                        }
                                    `}
                                >
                                    {/* --- HEADER CARD: Pachet & Status --- */}
                                    <div className={`px-6 py-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4
                                        ${isCompleted ? 'bg-green-950/20 border-green-900/30' : 'bg-zinc-800/50 border-zinc-700'}`}>

                                        <div className="flex items-center gap-3">
                                            {/* Badge Pachet */}
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border
                                                ${isPremium
                                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                }`}>
                                                {isPremium ? <Zap className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                                {isPremium ? 'PREMIUM (Agent)' : 'STANDARD (Scut)'}
                                            </div>

                                            {/* Preț */}
                                            <span className="text-white font-mono font-bold bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                                                {order.amount} RON
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-zinc-500 hidden md:inline-block">
                                                Data: {new Date(order.created_at).toLocaleString('ro-RO')}
                                            </span>
                                            <span className={`px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-1.5
                                                ${isCompleted
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                                {isCompleted ? 'FINALIZAT' : 'DE FĂCUT'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                                        {/* --- COLOANA 1: Despre Copil (Brief Creativ) --- */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                                                    {order.child_name}
                                                    <span className="text-lg font-normal text-zinc-400">({order.age} • {order.gender === 'boy' ? 'Băiat' : 'Fetiță'})</span>
                                                </h2>
                                                <p className="text-zinc-500 text-sm">Brief pentru video:</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-green-500/5 border border-green-500/10 p-4 rounded-lg">
                                                    <strong className="text-green-400 block mb-1 text-sm uppercase">👍 Faptă Bună</strong>
                                                    <p className="text-zinc-200">{order.good_deed}</p>
                                                </div>
                                                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-lg">
                                                    <strong className="text-red-400 block mb-1 text-sm uppercase">👎 De lucrat</strong>
                                                    <p className="text-zinc-200">{order.bad_deed}</p>
                                                </div>
                                                <div className="bg-purple-500/5 border border-purple-500/10 p-4 rounded-lg">
                                                    <strong className="text-purple-400 block mb-1 text-sm uppercase">🔮 Detaliu Secret</strong>
                                                    <p className="text-zinc-200">{order.secret_detail}</p>
                                                </div>
                                                <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-lg">
                                                    <strong className="text-blue-400 block mb-1 text-sm uppercase">🎁 Dorință</strong>
                                                    <p className="text-zinc-200">{order.wish}</p>
                                                </div>
                                            </div>

                                            {/* Note Speciale */}
                                            {order.notes && (
                                                <div className="bg-zinc-800/30 border border-zinc-700 p-3 rounded-lg flex gap-3">
                                                    <FileText className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <strong className="text-zinc-400 text-xs uppercase block">Notițe Părinte (Pronunție etc.)</strong>
                                                        <p className="text-white italic">"{order.notes}"</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Galerie Foto */}
                                            {order.images && order.images.length > 0 ? (
                                                <div className="border-t border-zinc-800 pt-4">
                                                    <strong className="text-zinc-400 text-xs uppercase flex items-center gap-2 mb-3">
                                                        <Camera className="w-4 h-4" /> Album Foto ({order.images.length} poze):
                                                    </strong>
                                                    <div className="flex flex-wrap gap-3">
                                                        {order.images.map((imgUrl, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={imgUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="relative group block w-24 h-24 rounded-lg overflow-hidden border border-zinc-700 hover:border-primary transition-all"
                                                            >
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Poza ${idx + 1}`}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                    <ExternalLink className="w-6 h-6 text-white" />
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="border-t border-zinc-800 pt-4 text-zinc-600 text-xs italic flex items-center gap-2">
                                                    <Camera className="w-4 h-4" /> Fără poze (Pachet Standard)
                                                </div>
                                            )}
                                        </div>

                                        {/* --- COLOANA 2: Client & Facturare (Partea Administrativă) --- */}
                                        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 h-fit">
                                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">
                                                Date Client & Facturare
                                            </h3>

                                            <div className="space-y-4">
                                                {/* Contact */}
                                                <div>
                                                    <div className="flex items-center gap-2 text-white mb-1">
                                                        <User className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">Contact Părinte</span>
                                                    </div>
                                                    <p className="text-sm text-zinc-400 ml-6 break-all">{order.parent_email}</p>
                                                    {order.phone && <p className="text-sm text-zinc-400 ml-6">{order.phone}</p>}
                                                </div>

                                                {/* Facturare */}
                                                <div className="pt-2">
                                                    <div className="flex items-center gap-2 text-white mb-2">
                                                        {order.is_company ? (
                                                            <Building2 className="w-4 h-4 text-amber-500" />
                                                        ) : (
                                                            <CreditCard className="w-4 h-4 text-blue-500" />
                                                        )}
                                                        <span className="font-medium">
                                                            {order.is_company ? 'Persoană Juridică' : 'Persoană Fizică'}
                                                        </span>
                                                    </div>

                                                    <div className="ml-6 bg-zinc-900 border border-zinc-800 p-3 rounded text-sm text-zinc-300 font-mono space-y-1">
                                                        <p className="font-bold text-white">{order.billing_name}</p>
                                                        {order.is_company && (
                                                            <>
                                                                <p className="text-amber-500">CUI: {order.company_cui}</p>
                                                                {order.company_reg_com && <p>Reg: {order.company_reg_com}</p>}
                                                            </>
                                                        )}
                                                        <div className="border-t border-zinc-800 my-1 pt-1 opacity-70">
                                                            <p>{order.billing_address}</p>
                                                            <p>{order.billing_city}, {order.billing_county}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                {!isCompleted && (
                                                    <div className="pt-6 mt-4 border-t border-zinc-800">
                                                        <button
                                                            onClick={() => markAsDone(order.id)}
                                                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                            Marchează Finalizat
                                                        </button>
                                                        <p className="text-xs text-center text-zinc-600 mt-2">
                                                            *Apasă doar după ce ai trimis emailul
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                        {orders.length === 0 && (
                            <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                                <p className="text-zinc-500 text-lg">Încă nu sunt comenzi.</p>
                                <p className="text-zinc-600 text-sm mt-1">Verifică dacă ești conectat la baza de date corectă.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}