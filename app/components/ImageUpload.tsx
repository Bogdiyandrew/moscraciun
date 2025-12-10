'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    onUploadComplete: (urls: string[]) => void;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newUrls: string[] = [];

        // Limita: Maxim 5 poze
        if (files.length + previewUrls.length > 5) {
            alert("Poți încărca maxim 5 poze!");
            setUploading(false);
            return;
        }

        try {
            for (const file of files) {
                // Generăm un nume unic: data-random-nume.jpg
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;

                // Upload în Supabase Storage (bucket-ul 'client-uploads')
                const { data, error } = await supabase.storage
                    .from('client-uploads')
                    .upload(fileName, file);

                if (error) throw error;

                // Obținem URL-ul public
                const { data: publicUrlData } = supabase.storage
                    .from('client-uploads')
                    .getPublicUrl(fileName);

                newUrls.push(publicUrlData.publicUrl);
            }

            const updatedList = [...previewUrls, ...newUrls];
            setPreviewUrls(updatedList);
            onUploadComplete(updatedList); // Trimitem lista de URL-uri părintelui (OrderForm)

        } catch (error: any) {
            alert('Eroare la upload: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        const updated = previewUrls.filter((_, idx) => idx !== indexToRemove);
        setPreviewUrls(updated);
        onUploadComplete(updated);
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Încarcă Poze cu Copilul (Max 5)
                <span className="text-xs text-muted-foreground font-normal ml-auto">
                    Vor apărea în "Albumul Magic"
                </span>
            </label>

            {/* Zona de Drop / Input */}
            <div className="border-2 border-dashed border-zinc-700 hover:border-primary rounded-xl p-6 transition-colors text-center cursor-pointer relative bg-zinc-900/50">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                <div className="flex flex-col items-center gap-2 text-zinc-400">
                    {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : (
                        <Upload className="w-8 h-8" />
                    )}
                    <p className="text-sm">
                        {uploading ? "Se încarcă..." : "Apasă aici sau trage pozele"}
                    </p>
                </div>
            </div>

            {/* Previzualizare Poze */}
            {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-700 group">
                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}