'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase'; // Asigură-te că ai creat fișierul de la pasul 2

export default function Home() {
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

    // Salvarea în Supabase
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
      <div className="min-h-screen flex items-center justify-center bg-red-700 text-white p-4">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">🌟 Comandă Primită!</h1>
          <p className="text-xl">Spiridușii au notat totul în Marea Carte.</p>
          <p className="mt-4 opacity-90">Vei primi video-ul personalizat de la Moș Crăciun pe email ({formData.parent_email}) în curând.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide">
            Mesaj de la Moș Crăciun
          </h1>
          <p className="text-red-100 mt-2">Completează detaliile "secrete" pentru un video magic.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Numele Copilului</label>
              <input required name="child_name" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: Andrei" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Vârsta</label>
              <input required name="age" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: 5 ani" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">O faptă bună recentă (pentru laudă)</label>
            <textarea required name="good_deed" onChange={handleChange} rows={2} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: A împărțit jucăriile cu sora lui..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Ceva de îmbunătățit (partea educativă)</label>
            <textarea required name="bad_deed" onChange={handleChange} rows={2} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: Nu prea vrea să se spele pe dinți seara..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Detaliul "Magic" (pe care doar Moșul îl știe)</label>
            <input required name="secret_detail" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: Numele pisicii, educatoarea preferată..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Ce își dorește de Crăciun?</label>
            <input required name="wish" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="ex: LEGO Ninjago" />
          </div>

          <div className="border-t border-slate-200 pt-6 mt-6">
            <h3 className="text-lg font-bold mb-4">Datele Părintelui</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email (unde trimitem video)</label>
                <input required type="email" name="parent_email" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="email@exemplu.ro" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon (Opțional)</label>
                <input name="phone" onChange={handleChange} className="w-full border-slate-300 border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="07xx..." />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-50"
          >
            {loading ? 'Se trimite la Polul Nord...' : 'Trimite Comanda către Moșul 🎅'}
          </button>
          <p className="text-xs text-center text-slate-400 mt-2">Datele sunt procesate manual și șterse după Crăciun.</p>
        </form>
      </div>
    </div>
  );
}