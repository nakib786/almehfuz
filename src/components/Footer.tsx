'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';

export default function Footer() {
    const { t } = useLang();

    return (
        <footer
            role="contentinfo"
            style={{
                background: 'linear-gradient(135deg, var(--navy) 0%, #0a1628 40%, #071420 100%)',
                color: 'var(--bg)',
                padding: '60px 0 32px',
                marginTop: '80px',
                borderTop: '3px solid var(--gold)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    content: "''",
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 80% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(26,92,66,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div
                    className="footer-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr',
                        gap: '48px',
                        paddingBottom: '40px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {/* Brand */}
                    <div className="footer-brand" style={{ gridColumn: undefined }}>
                        <Link href="/" className="logo-glow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                            <Image
                                src="/logo.svg"
                                alt="Al Mehfuz"
                                width={40}
                                height={40}
                                style={{
                                    height: '40px',
                                    width: 'auto',
                                    display: 'block'
                                }}
                            />
                            <div style={{ color: 'var(--gold2)', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {t('hero-title')}
                            </div>
                        </Link>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(232,201,106,0.5)', marginTop: '12px' }}>
                            {t('footer-mission')}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }} aria-label="Social media links">
                            {[
                                {
                                    icon: 'f',
                                    label: 'Facebook',
                                    href: 'https://www.facebook.com/profile.php?id=100081794237656#'
                                },
                                {
                                    icon: '◉',
                                    label: 'Instagram',
                                    href: 'https://www.instagram.com/almehfuz92/'
                                }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: 38,
                                        height: 38,
                                        border: '1px solid rgba(201,168,76,0.3)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'rgba(201,168,76,0.6)',
                                        fontSize: '0.9rem',
                                        transition: 'var(--transition)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 700 }}>
                            {t('quick-links')}
                        </div>
                        <ul style={{ listStyle: 'none' }}>
                            {[
                                { href: '/', key: 'nav-home' },
                                { href: '/about', key: 'nav-about' },
                                { href: '/activities', key: 'nav-activities' },
                                { href: '/teachings', key: 'nav-teachings' },
                                { href: '/gallery', key: 'nav-gallery' },
                                { href: '/contact', key: 'nav-contact' },
                                { href: '/sitemap', key: 'nav-sitemap' },
                            ].map((link) => (
                                <li key={link.key} style={{ marginBottom: '8px' }}>
                                    <Link
                                        href={link.href}
                                        style={{ color: 'rgba(232,201,106,0.6)', fontSize: '0.9rem', transition: 'var(--transition)', textDecoration: 'none' }}
                                    >
                                        {t(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontWeight: 700 }}>
                            {t('contact-heading')}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(245,242,236,0.6)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                            {t('footer-addr')}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '24px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(201,168,76,0.35)' }}>
                        {t('copyright').replace('{year}', new Date().getFullYear().toString())}
                    </p>
                </div>
            </div>
        </footer>
    );
}
