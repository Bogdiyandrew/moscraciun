'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Snowflake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

const loadingMessages = [
    "Conectare la Polul Nord...",
    "Verificăm lista copiilor...",
    "Hrănim renii...",
    "Lustruim sania...",
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
        }, 3000);

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
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

                    <div className="relative mb-10">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-primary/20 rounded-full"
                        />

                        <motion.div
                            animate={{
                                rotate: [0, -5, 5, -5, 5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                            className="relative bg-primary p-6 rounded-2xl shadow-xl shadow-primary/20 z-10"
                        >
                            <Gift className="w-16 h-16 text-white" />
                        </motion.div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-6 -right-6 text-blue-400 z-20"
                        >
                            <Snowflake className="w-8 h-8 fill-blue-400/20" />
                        </motion.div>
                    </div>

                    <div className="h-10 flex items-center justify-center overflow-hidden relative w-full max-w-md text-center px-4">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={messageIndex}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
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
                                duration: 2.8,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}