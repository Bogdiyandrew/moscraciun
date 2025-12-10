'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gift, Sun, Moon, Home, HelpCircle, BookOpen, Send } from 'lucide-react';
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
            {/* --- DESKTOP SIDEBAR (Stânga) --- */}
            <motion.aside
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-50 bg-card border-r border-border h-screen transition-colors duration-300"
            >

                {/* Logo Area */}
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        onClick={handleLogoClick}
                        className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <Gift className="text-primary-foreground w-6 h-6" />
                    </motion.div>
                    <span
                        onClick={handleLogoClick}
                        className="font-bold text-lg tracking-tight text-foreground cursor-pointer transition-colors"
                    >
                        Biroul<span className="text-primary">Mosului</span>
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5, backgroundColor: "var(--muted)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group relative overflow-hidden"
                        >
                            <span className="group-hover:text-primary transition-colors relative z-10">{item.icon}</span>
                            <span className="relative z-10">{item.name}</span>
                        </motion.button>
                    ))}
                </nav>

                {/* Footer Sidebar (Theme + CTA) */}
                <motion.div
                    variants={itemVariants}
                    className="p-4 border-t border-border space-y-4"
                >
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs text-muted-foreground font-medium">Temă</span>
                        {mounted && (
                            <motion.button
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
                                aria-label="Schimbă tema"
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </motion.button>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('comanda')}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-primary-foreground py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                    >
                        <Send className="w-4 h-4" /> Comandă Video
                    </motion.button>
                </motion.div>
            </motion.aside>


            {/* --- MOBILE HEADER (Sus) --- */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
                <div className="px-4 h-16 flex items-center justify-between">

                    {/* Logo Mobil */}
                    <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="bg-primary p-1.5 rounded-lg"
                        >
                            <Gift className="text-primary-foreground w-5 h-5" />
                        </motion.div>
                        <span className="font-bold text-lg text-foreground">
                            Biroul<span className="text-primary">Mosului</span>
                        </span>
                    </div>


                    {/* Controls Mobil */}
                    <div className="flex items-center gap-2">
                        {mounted && (
                            <motion.button
                                whileTap={{ rotate: 180 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted text-foreground"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.button>
                        )}
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            className="text-foreground p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

            </header>

            {/* Mobile Menu Overlay (Moved outside header to avoid stacking context issues) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
                            style={{ zIndex: 9990 }}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-card border-l border-border shadow-2xl flex flex-col overflow-y-auto md:hidden"
                            style={{ zIndex: 9999 }}
                        >
                            <div className="p-4 flex items-center justify-between border-b border-border">
                                <span className="font-bold text-lg">Meniu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
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
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted text-left font-medium"
                                    >
                                        <span className="text-primary">{item.icon}</span>
                                        {item.name}
                                    </motion.button>
                                ))}
                                <div className="h-px bg-border my-2"></div>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => scrollToSection('comanda')}
                                    className="bg-primary text-primary-foreground py-3 rounded-xl font-bold text-center mt-2 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" /> Comandă Mesaj Video
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}