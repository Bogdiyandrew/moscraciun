'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Camera, FileText, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
        if (error) console.error("Eroare la fetch:", error);
    };

    const markAsDone = async (id: number) => {
        const confirm = window.confirm("Sigur ai trimis mailul? Marchez comanda ca finalizată?");
        if (!confirm) return;

        await supabase.from('orders').update({ status: 'completed' }).eq('id', id);
        fetchOrders(); // Refresh
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-zinc-200">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
                    🎅 Dashboard Comenzi <span className="text-sm bg-primary px-2 py-1 rounded text-white font-normal">Hustle Mode</span>
                </h1>

                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className={`p-6 bg-zinc-900 rounded-xl border ${order.status === 'completed' ? 'border-green-500/30 opacity-60' : 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]'}`}>

                            {/* HEADER COMANDA */}
                            <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        {order.child_name}
                                        <span className="text-base font-normal text-zinc-400">({order.age})</span>
                                    </h2>
                                    <p className="text-sm text-zinc-500 font-mono mt-1">
                                        Client: <span className="text-zinc-300">{order.parent_email}</span> {order.phone && `| Tel: ${order.phone}`}
                                    </p>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        Data: {new Date(order.created_at).toLocaleString('ro-RO')}
                                    </p>
                                </div>
                                <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${order.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-yellow-900/30 text-yellow-500 border border-yellow-500/30 animate-pulse'}`}>
                                    {order.status === 'pending' ? '⏳ În Lucru' : '✅ Finalizat'}
                                </span>
                            </div>

                            {/* DETALII TEXT (GRID) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-6">
                                <div className="bg-green-900/10 border border-green-500/20 p-3 rounded-lg">
                                    <strong className="text-green-400 block mb-1">👍 Faptă Bună</strong>
                                    <p className="text-zinc-300">{order.good_deed}</p>
                                </div>
                                <div className="bg-red-900/10 border border-red-500/20 p-3 rounded-lg">
                                    <strong className="text-red-400 block mb-1">👎 De lucrat</strong>
                                    <p className="text-zinc-300">{order.bad_deed}</p>
                                </div>
                                <div className="bg-purple-900/10 border border-purple-500/20 p-3 rounded-lg">
                                    <strong className="text-purple-400 block mb-1">🔮 Secret</strong>
                                    <p className="text-zinc-300">{order.secret_detail}</p>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg">
                                    <strong className="text-blue-400 block mb-1">🎁 Dorință</strong>
                                    <p className="text-zinc-300">{order.wish}</p>
                                </div>
                            </div>

                            {/* --- ZONA NOTIȚE EXTRA --- */}
                            {order.notes && (
                                <div className="mb-6 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700">
                                    <strong className="text-zinc-400 text-xs uppercase flex items-center gap-1 mb-1">
                                        <FileText className="w-3 h-3" /> Notițe de la părinte:
                                    </strong>
                                    <p className="text-white italic">"{order.notes}"</p>
                                </div>
                            )}

                            {/* --- ZONA POZE UPLOADATE --- */}
                            {order.images && order.images.length > 0 ? (
                                <div className="mb-6">
                                    <strong className="text-zinc-400 text-xs uppercase flex items-center gap-1 mb-3">
                                        <Camera className="w-3 h-3" /> Album Foto ({order.images.length}):
                                    </strong>
                                    <div className="flex flex-wrap gap-3">
                                        {order.images.map((imgUrl: string, idx: number) => (
                                            <a
                                                key={idx}
                                                href={imgUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative group block w-24 h-24 rounded-lg overflow-hidden border border-zinc-700 hover:border-primary transition-colors"
                                                title="Click pentru a deschide originalul"
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={`Poza ${idx + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <ExternalLink className="w-6 h-6 text-white" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 text-zinc-600 text-xs italic">
                                    * Fără poze atașate (Doar video standard)
                                </div>
                            )}

                            {/* ACTION BUTTONS */}
                            {order.status !== 'completed' && (
                                <div className="flex justify-end pt-4 border-t border-zinc-800">
                                    <button
                                        onClick={() => markAsDone(order.id)}
                                        className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        ✅ Comanda e Gata (Trimis Mail)
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="text-center py-20 text-zinc-500">
                            Nu ai nicio comandă încă. Spor la treabă!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}