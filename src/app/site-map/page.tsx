'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { SectionHeader, Section, Breadcrumb } from '@/components/ui/SectionHeader';
import { DATA } from '@/data/siteData';

export default function SitemapPage() {
    const { t, tData } = useLang();

    const sections = [
        {
            title: t('nav-home'),
            links: [
                { label: t('nav-home'), href: '/' },
                { label: t('nav-about'), href: '/about' },
                { label: t('nav-activities'), href: '/activities' },
                { label: t('nav-teachings'), href: '/teachings' },
                { label: t('nav-gallery'), href: '/gallery' },
                { label: t('nav-contact'), href: '/contact' },
            ]
        },
        {
            title: t('teachings-title'),
            links: DATA.teachings.map(teaching => ({
                label: tData(teaching.title),
                href: `/teachings/${teaching.slug}`
            }))
        }
    ];

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-sitemap') }]} />
            </div>

            <Section>
                <div className="container">
                    <SectionHeader label={t('nav-sitemap')} title={t('nav-sitemap')} as="h1" />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                        {sections.map((section, idx) => (
                            <div key={idx} className="card">
                                <h2 style={{ fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '20px', borderBottom: '1px solid var(--gold)', paddingBottom: '10px' }}>
                                    {section.title}
                                </h2>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx} style={{ marginBottom: '12px' }}>
                                            <Link
                                                href={link.href}
                                                style={{
                                                    color: 'var(--accent)',
                                                    textDecoration: 'none',
                                                    fontSize: '1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <span style={{ color: 'var(--gold)' }}>•</span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
