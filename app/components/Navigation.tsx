'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gift, Sun, Moon, Home, HelpCircle, BookOpen, Send } from 'lucide-react';
import { useTheme } from "next-themes";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { name: 'Acasă', id: 'hero', icon: <Home className="w-5 h-5" /> },
        { name: 'Cum funcționează', id: 'despre', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Poveste', id: 'povesti', icon: <Gift className="w-5 h-5" /> },
        { name: 'Întrebări', id: 'faq', icon: <HelpCircle className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* --- DESKTOP SIDEBAR (Stânga) --- */}
            <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-50 bg-card border-r border-border h-screen transition-colors duration-300">

                {/* Logo Area */}
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
                        <Gift className="text-primary-foreground w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-foreground">
                        Biroul<span className="text-primary">Mosului</span>
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm font-medium group"
                        >
                            <span className="group-hover:text-primary transition-colors">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Footer Sidebar (Theme + CTA) */}
                <div className="p-4 border-t border-border space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs text-muted-foreground font-medium">Temă</span>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
                                aria-label="Schimbă tema"
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => scrollToSection('comanda')}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-primary-foreground py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
                    >
                        <Send className="w-4 h-4" /> Comandă Video
                    </button>
                </div>
            </aside>


            {/* --- MOBILE HEADER (Sus) --- */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
                <div className="px-4 h-16 flex items-center justify-between">

                    {/* Logo Mobil */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Gift className="text-primary-foreground w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-foreground">
                            Biroul<span className="text-primary">Mosului</span>
                        </span>
                    </Link>

                    {/* Controls Mobil */}
                    <div className="flex items-center gap-2">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full hover:bg-muted text-foreground"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            className="text-foreground p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-card border-b border-border shadow-2xl flex flex-col p-4 gap-2 animate-in slide-in-from-top-5">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted text-left font-medium"
                            >
                                <span className="text-primary">{item.icon}</span>
                                {item.name}
                            </button>
                        ))}
                        <div className="h-px bg-border my-2"></div>
                        <button
                            onClick={() => scrollToSection('comanda')}
                            className="bg-primary text-primary-foreground py-3 rounded-xl font-bold text-center mt-2 flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Comandă Mesaj Video
                        </button>
                    </div>
                )}
            </header>
        </>
    );
}