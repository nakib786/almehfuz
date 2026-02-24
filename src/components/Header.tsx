'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { Lang } from '@/data/siteData';

const langLabels: Record<Lang, string> = { en: 'EN', ur: 'اردو', ar: 'عر', hi: 'हिं' };
const langOptions: { code: Lang; label: string }[] = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
    { code: 'hi', label: 'हिन्दी' },
];

const navLinks = [
    { href: '/', page: 'home', key: 'nav-home' },
    { href: '/about', page: 'about', key: 'nav-about' },
    { href: '/activities', page: 'activities', key: 'nav-activities' },
    { href: '/teachings', page: 'teachings', key: 'nav-teachings' },
    { href: '/gallery', page: 'gallery', key: 'nav-gallery' },
    { href: '/contact', page: 'contact', key: 'nav-contact' },
];

export default function Header() {
    const { lang, setLang, t } = useLang();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
        document.body.classList.remove('nav-open');
    }, [pathname]);

    const toggleMenu = () => {
        const newState = !menuOpen;
        setMenuOpen(newState);
        document.body.classList.toggle('nav-open', newState);
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <header
                role="banner"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    background: 'rgba(15,31,61,0.97)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '2px solid var(--gold)',
                    height: 'var(--header-h)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: 'var(--max-w)',
                        margin: '0 auto',
                        padding: '0 24px',
                        gap: '16px',
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="logo-glow"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            textDecoration: 'none',
                            flexShrink: 0,
                        }}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Al Mehfuz"
                            width={48}
                            height={48}
                            style={{
                                height: '48px',
                                width: 'auto',
                                display: 'block'
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--gold2)',
                                lineHeight: 1.2,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}>
                                {t('hero-title')}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        id="main-nav"
                        role="navigation"
                        aria-label="Main navigation"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                        className="desktop-nav"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.page}
                                href={link.href}
                                style={{
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: isActive(link.href) ? 'var(--gold2)' : 'rgba(232,201,106,0.75)',
                                    padding: '6px 10px',
                                    borderRadius: 'var(--radius)',
                                    transition: 'var(--transition)',
                                    whiteSpace: 'nowrap',
                                    textDecoration: 'none',
                                    background: isActive(link.href) ? 'rgba(201,168,76,0.15)' : undefined,
                                    borderBottom: isActive(link.href) ? '2px solid var(--gold)' : undefined,
                                }}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        {/* Language Switcher */}
                        <div ref={dropdownRef} style={{ position: 'relative' }}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                aria-label="Change language"
                                style={{
                                    background: 'none',
                                    border: '1px solid rgba(201,168,76,0.5)',
                                    padding: '6px 12px',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.06em',
                                    color: 'var(--gold2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'var(--transition)',
                                    cursor: 'pointer',
                                }}
                            >
                                {langLabels[lang]} ▾
                            </button>
                            {dropdownOpen && (
                                <div
                                    role="menu"
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 6px)',
                                        right: 0,
                                        background: 'var(--navy)',
                                        border: '1px solid var(--gold)',
                                        borderRadius: 'var(--radius)',
                                        minWidth: 140,
                                        boxShadow: '0 8px 32px rgba(15,31,61,0.4)',
                                        zIndex: 200,
                                    }}
                                >
                                    {langOptions.map((opt) => (
                                        <button
                                            key={opt.code}
                                            role="menuitem"
                                            onClick={() => {
                                                setLang(opt.code);
                                                setDropdownOpen(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px 14px',
                                                fontSize: '0.85rem',
                                                color: lang === opt.code ? 'var(--gold)' : 'rgba(232,201,106,0.8)',
                                                fontWeight: lang === opt.code ? 600 : 400,
                                                cursor: 'pointer',
                                                transition: 'var(--transition)',
                                                border: 'none',
                                                background: 'none',
                                                width: '100%',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile hamburger toggle */}
                        <button
                            className="menu-toggle"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                            style={{
                                display: 'none',
                                background: 'none',
                                border: '1px solid rgba(201,168,76,0.4)',
                                padding: '6px 10px',
                                borderRadius: 'var(--radius)',
                                color: 'var(--gold2)',
                                fontSize: '1.2rem',
                                position: 'relative',
                                zIndex: 10001,
                            }}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay (Modal Lightbox Style) moved outside to escape container issues */}
            <div
                className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 31, 61, 0.9)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    zIndex: 10000,
                    display: menuOpen ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    opacity: menuOpen ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    overflowY: 'auto'
                }}
            >
                {/* Modal Content Box */}
                <div
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    style={{
                        background: 'var(--navy)',
                        border: '1px solid var(--gold)',
                        borderRadius: '16px',
                        padding: '60px 24px 40px',
                        width: '100%',
                        maxWidth: '380px',
                        position: 'relative',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                        transform: menuOpen ? 'scale(1)' : 'scale(0.95)',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxHeight: 'calc(100vh - 48px)',
                        margin: 'auto'
                    }}
                >
                    {/* Close Button Inside Modal */}
                    <button
                        onClick={toggleMenu}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: '1px solid rgba(201,168,76,0.3)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold2)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                        }}
                    >
                        ✕
                    </button>

                    <Link href="/" onClick={toggleMenu} className="logo-glow" style={{ marginBottom: '40px', textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                        <Image
                            src="/logo.svg"
                            alt="Al Mehfuz"
                            width={80}
                            height={80}
                            style={{
                                height: '80px',
                                width: 'auto',
                                margin: '0 auto 12px',
                                display: 'block'
                            }}
                        />
                        <div style={{ color: 'var(--gold2)', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('hero-title')}</div>
                        <div style={{ height: '1px', background: 'var(--gold)', width: '60px', margin: '20px auto', opacity: 0.3 }} />
                    </Link>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            width: '100%',
                            overflowY: 'auto',
                            padding: '4px'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.page}
                                href={link.href}
                                onClick={toggleMenu}
                                style={{
                                    fontSize: '1.25rem',
                                    color: isActive(link.href) ? 'var(--gold)' : 'var(--gold2)',
                                    letterSpacing: '0.1rem',
                                    textTransform: 'uppercase',
                                    fontWeight: isActive(link.href) ? 600 : 400,
                                    textDecoration: 'none',
                                    padding: '12px 20px',
                                    borderRadius: '12px',
                                    background: isActive(link.href) ? 'rgba(201,168,76,0.15)' : 'transparent',
                                    width: '100%',
                                    textAlign: 'center',
                                    transition: 'var(--transition)',
                                    border: isActive(link.href) ? '1px solid var(--gold)' : '1px solid transparent',
                                }}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .menu-toggle {
                        display: flex !important;
                    }
                }
            `}</style>
        </>
    );
}
