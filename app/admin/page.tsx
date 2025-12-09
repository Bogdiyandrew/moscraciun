'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
    };

    const markAsDone = async (id: number) => {
        await supabase.from('orders').update({ status: 'completed' }).eq('id', id);
        fetchOrders(); // Refresh
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">🎅 Comenzile Mele (Hustle Mode)</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className={`p-6 bg-white rounded-lg shadow border-l-4 ${order.status === 'completed' ? 'border-green-500 opacity-60' : 'border-red-500'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">{order.child_name} ({order.age})</h2>
                                <p className="text-sm text-gray-500">Părinte: {order.parent_email}</p>
                            </div>
                            <span className={`px-3 py-1 rounded text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-green-50 p-2 rounded">
                                <strong>👍 Faptă Bună:</strong>
                                <p>{order.good_deed}</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded">
                                <strong>👎 De lucrat:</strong>
                                <p>{order.bad_deed}</p>
                            </div>
                            <div className="bg-purple-50 p-2 rounded">
                                <strong>🔮 Secret:</strong>
                                <p>{order.secret_detail}</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                                <strong>🎁 Dorință:</strong>
                                <p>{order.wish}</p>
                            </div>
                        </div>

                        {order.status !== 'completed' && (
                            <button
                                onClick={() => markAsDone(order.id)}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                ✅ Marchez ca terminat (Video Trimis)
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}