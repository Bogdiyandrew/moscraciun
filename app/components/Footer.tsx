'use client';
import { Gift, Heart, Facebook, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border mt-auto pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* 1. Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Gift className="text-primary w-5 h-5" />
                            </div>
                            <span className="font-bold text-lg text-foreground">
                                Biroul<span className="text-primary">Mosului</span>.ro
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Magie digitală, emoție reală. <br />
                            Creăm amintiri video personalizate pentru Crăciun.
                        </p>
                    </div>

                    {/* 2. Navigare */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Navigare</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/#hero" className="hover:text-primary transition-colors">Acasă</Link></li>
                            <li><Link href="/#despre" className="hover:text-primary transition-colors">Cum funcționează</Link></li>
                            <li><Link href="/#povesti" className="hover:text-primary transition-colors">Despre Noi</Link></li>
                            <li><Link href="/#faq" className="hover:text-primary transition-colors">Întrebări</Link></li>
                        </ul>
                    </div>

                    {/* 3. Legal & Contact */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Legal & Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/termeni" className="hover:text-primary transition-colors">Termeni și Condiții</Link></li>
                            <li><Link href="/confidentialitate" className="hover:text-primary transition-colors">Politica GDPR</Link></li>
                            <li className="pt-2">
                                <a href="mailto:contact@biroulmosului.ro" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Mail className="w-4 h-4" /> contact@biroulmosului.ro
                                </a>
                            </li>
                        </ul>

                        {/* ZONA ANPC (OBLIGATORIE) - Cu link-uri GitHub */}
                        <div className="mt-8 flex flex-col gap-3">
                            <a
                                href="http://www.anpc.ro/categorie/557/sal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 duration-300"
                            >
                                <img
                                    src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg"
                                    alt="Logo SAL"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <a
                                href="https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=RO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 duration-300"
                            >
                                <img
                                    src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg"
                                    alt="Logo SOL"
                                    className="h-8 w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {currentYear} BiroulMosului.ro</p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>

                        <span className="flex items-center gap-1 opacity-60">
                            Făcut cu <Heart className="w-3 h-3 text-red-500 fill-red-500" /> în România
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}