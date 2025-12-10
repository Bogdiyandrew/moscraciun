'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';

export default function WinterLoader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
    const { isLoading, setIsLoading } = useLoading();

    useEffect(() => {
        // 1. Blochează scroll-ul când loader-ul este activ
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        }

        // 2. Simulăm încărcarea (sau poți lega asta de încărcarea reală a asset-urilor)
        const timer = setTimeout(() => {
            setIsLoading(false);

            // 3. Deblochează scroll-ul după ce animația de ieșire începe
            setTimeout(() => {
                document.body.style.overflow = 'unset';
                if (onLoadingComplete) onLoadingComplete();
            }, 1000); // Așteptăm să se termine animația de exit

        }, 2500); // Durata loading-ului (2.5 secunde)

        return () => {
            document.body.style.overflow = 'unset';
            clearTimeout(timer);
        };
    }, [onLoadingComplete, setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-zinc-950 text-white"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: -1000, // Pleacă în sus
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Curba Bezier pentru efect "premium"
                    }}
                >
                    {/* Container Central */}
                    <div className="relative flex flex-col items-center gap-6">

                        {/* Fulgul care pulsează și se rotește */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative"
                        >
                            <Snowflake className="w-16 h-16 text-primary" strokeWidth={1.5} />

                            {/* Efect de strălucire în spate */}
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        </motion.div>

                        {/* Text cu apariție treptată */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center space-y-2"
                        >
                            <h2 className="text-2xl font-bold tracking-wider">BIROUL MOȘULUI</h2>
                            <p className="text-zinc-400 text-sm animate-pulse">Pregătim magia...</p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mt-4">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.3, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}