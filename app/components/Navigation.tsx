'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gift, Sun, Moon, Home, HelpCircle, Form, BookOpen, Send, Sparkles } from 'lucide-react';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        if (pathname !== '/') {
            router.push(`/#${id}`);
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogoClick = () => {
        if (pathname !== '/') {
            router.push('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navItems = [
        { name: 'Acasă', id: 'hero', icon: <Home className="w-5 h-5" /> },
        { name: 'Cum funcționează', id: 'despre', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Poveste', id: 'povesti', icon: <Gift className="w-5 h-5" /> },
        { name: 'Întrebări', id: 'faq', icon: <HelpCircle className="w-5 h-5" /> },
        { name: 'Formular', id: 'comanda', icon: <Form className="w-5 h-5" /> },
    ];

    const sidebarVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <>
            <motion.aside
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-50 bg-card/80 dark:bg-card/40 backdrop-blur-xl border-r border-border h-screen transition-colors duration-300 shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

                <div className="p-6 border-b border-border/50 flex items-center gap-3 relative z-10">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        onClick={handleLogoClick}
                        className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/30 cursor-pointer"
                    >
                        <Gift className="text-white w-6 h-6" />
                    </motion.div>
                    <span
                        onClick={handleLogoClick}
                        className="font-bold text-lg tracking-tight text-foreground cursor-pointer transition-colors"
                    >
                        Biroul<span className="text-primary">Mosului</span>
                    </span>
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto relative z-10">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(var(--primary), 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-primary transition-all text-sm font-medium group relative overflow-hidden cursor-pointer"
                        >
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center rounded-full" />

                            <span className="group-hover:text-primary transition-colors relative z-10 group-hover:scale-110 duration-200">
                                {item.icon}
                            </span>
                            <span className="relative z-10">{item.name}</span>
                        </motion.button>
                    ))}
                </nav>

                <motion.div
                    variants={itemVariants}
                    className="p-4 border-t border-border/50 space-y-4 relative z-10 bg-background/50 backdrop-blur-sm"
                >
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" /> Atmosferă
                        </span>
                        {mounted && (
                            <motion.button
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted transition-colors text-foreground cursor-pointer border border-transparent hover:border-border"
                                aria-label="Schimbă tema"
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                            </motion.button>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => scrollToSection('comanda')}
                        className="
                            w-full flex items-center justify-center gap-2 
                            bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400
                            text-white py-3 rounded-xl font-bold text-sm 
                            shadow-lg shadow-red-500/20 hover:shadow-red-500/40 
                            transition-all cursor-pointer relative overflow-hidden
                        "
                    >
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 hover:animate-shine" />
                        <Send className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Comandă Video</span>
                    </motion.button>
                </motion.div>
            </motion.aside>


            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border/50 transition-colors duration-300">
                <div className="px-4 h-16 flex items-center justify-between">

                    <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="bg-primary p-1.5 rounded-lg shadow-sm"
                        >
                            <Gift className="text-white w-5 h-5" />
                        </motion.div>
                        <span className="font-bold text-lg text-foreground">
                            Biroul<span className="text-primary">Mosului</span>
                        </span>
                    </div>


                    <div className="flex items-center gap-2">
                        {mounted && (
                            <motion.button
                                whileTap={{ rotate: 180 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted text-foreground cursor-pointer"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.button>
                        )}
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            className="text-foreground p-2 cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden cursor-pointer"
                            style={{ zIndex: 9990 }}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-card border-l border-border shadow-2xl flex flex-col overflow-y-auto md:hidden"
                            style={{ zIndex: 9999 }}
                        >
                            <div className="p-4 flex items-center justify-between border-b border-border">
                                <span className="font-bold text-lg">Meniu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-4 flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-foreground hover:bg-muted active:scale-95 transition-all text-left font-medium cursor-pointer"
                                    >
                                        <span className="text-primary bg-primary/10 p-2 rounded-lg">{item.icon}</span>
                                        {item.name}
                                    </motion.button>
                                ))}
                                <div className="h-px bg-border my-4"></div>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => scrollToSection('comanda')}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-white py-4 rounded-xl font-bold text-center mt-2 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                                >
                                    <Send className="w-5 h-5" /> Comandă Mesaj Video
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}