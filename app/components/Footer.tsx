'use client';

import { Heart, Facebook, Instagram, Mail, Snowflake } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link href={href} className="group flex items-center gap-2 w-fit text-muted-foreground hover:text-primary transition-colors duration-300">
            <span className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 transform translate-x-2 text-primary">
                <Snowflake className="w-3 h-3" />
            </span>
            {children}
        </Link>
    );

    return (
        <footer className="relative w-full mt-24">

            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[99%] z-10">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-card/50 dark:fill-card/30"
                    ></path>
                </svg>
            </div>

            <div className="relative bg-card/50 dark:bg-card/30 backdrop-blur-lg border-t border-border pt-16 pb-8 overflow-hidden">

                <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
                    >

                        <div className="col-span-1 md:col-span-2 space-y-6">
                            <Link href="/" className="flex items-center gap-2 group w-fit">
                                <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                                    <Image
                                        src="/biroulmosului.svg"
                                        alt="Logo Biroul Mosului"
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                    />
                                </div>
                                <span className="font-bold text-xl text-foreground tracking-tight">
                                    Biroul<span className="text-primary">Mosului</span>.ro
                                </span>
                            </Link>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                                Transformăm Crăciunul într-o amintire eternă. <br />
                                Mesaje video personalizate direct de la Polul Nord, create cu grijă și magie pentru copilul tău.
                            </p>

                            <div className="flex items-center gap-4 pt-2">
                                <motion.a whileHover={{ scale: 1.1 }} href="#" className="bg-background border border-border p-2 rounded-full hover:border-primary hover:text-primary transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </motion.a>
                                <motion.a whileHover={{ scale: 1.1 }} href="#" className="bg-background border border-border p-2 rounded-full hover:border-primary hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-foreground mb-6">Exploarează</h3>
                            <ul className="space-y-3 text-sm">
                                <li><FooterLink href="/#hero">Acasă</FooterLink></li>
                                <li><FooterLink href="/#despre">Cum funcționează</FooterLink></li>
                                <li><FooterLink href="/#povesti">Povestea Noastră</FooterLink></li>
                                <li><FooterLink href="/#faq">Întrebări Frecvente</FooterLink></li>
                                <li><FooterLink href="/contact">Contact</FooterLink></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-foreground mb-6">Suport & Legal</h3>
                            <ul className="space-y-3 text-sm">
                                <li><FooterLink href="/termeni">Termeni și Condiții</FooterLink></li>
                                {/* AICI AM ADĂUGAT LINK-UL DE COOKIES */}
                                <li><FooterLink href="/cookies">Politica Cookies</FooterLink></li>
                                <li><FooterLink href="/confidentialitate">Politica GDPR</FooterLink></li>
                                <li className="pt-4">
                                    <a href="mailto:contact@biroulmosului.ro" className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
                                        <Mail className="w-4 h-4" /> contact@biroulmosului.ro
                                    </a>
                                </li>
                                <li className="text-muted-foreground text-xs">
                                    Luni - Vineri: 09:00 - 22:00
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <div className="border-t border-border/50 py-8">
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 opacity-80 hover:opacity-100 transition-opacity">
                            <a
                                href="http://www.anpc.ro/categorie/557/sal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-transform duration-300 grayscale hover:grayscale-0"
                            >
                                <img
                                    src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg"
                                    alt="Logo SAL"
                                    className="h-[25px] md:h-[30px] w-auto"
                                />
                            </a>
                            <a
                                href="https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=RO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-transform duration-300 grayscale hover:grayscale-0"
                            >
                                <img
                                    src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg"
                                    alt="Logo SOL"
                                    className="h-[25px] md:h-[30px] w-auto"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <p>© {currentYear} BiroulMosului.ro. Toate drepturile rezervate.</p>

                        <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full border border-border/50">
                            <span>Făcut cu</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                            </motion.div>
                            <span>în România</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}