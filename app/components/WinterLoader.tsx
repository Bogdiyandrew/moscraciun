'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Snowflake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

const loadingMessages = [
    "Conectare la Polul Nord...",
    "Verificăm Lista Copiilor...",
    "Hrănim Renii...",
    "Lustruim Sania...",
    "Împachetăm pixelii magici..."
];

export default function WinterLoader() {
    const { isLoading, setIsLoading } = useLoading();
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 800);
        const closeTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => {
            clearInterval(messageInterval);
            clearTimeout(closeTimer);
        };
    }, [isLoading, setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative mb-10">
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                        />

                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, -5, 5, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                            className="relative bg-primary p-6 rounded-2xl shadow-2xl shadow-primary/30 z-10"
                        >
                            <Gift className="w-16 h-16 text-white" />
                        </motion.div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-6 -right-6 text-blue-400 z-20"
                        >
                            <Snowflake className="w-8 h-8 fill-blue-400/20" />
                        </motion.div>
                    </div>

                    <div className="h-10 flex items-center justify-center overflow-hidden relative w-full max-w-md text-center px-4">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={messageIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-xl font-bold text-foreground"
                            >
                                {loadingMessages[messageIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 w-64 h-2 bg-muted rounded-full overflow-hidden relative border border-white/5">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-primary rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                                duration: 3.2,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute inset-y-0 w-10 bg-white/40 blur-sm"
                            animate={{ x: [-40, 300] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}