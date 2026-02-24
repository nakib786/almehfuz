'use client';

import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { SectionHeader, Section, Breadcrumb } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

export default function AboutPage() {
    const { t, tData } = useLang();

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-about') }]} />
            </div>

            {/* Intro */}
            <Section>
                <div className="container">
                    <SectionHeader label={t('about-label')} title={t('about-title')} as="h1" />
                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '20px' }}>{t('about-p1')}</p>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text2)' }}>{t('about-p2')}</p>
                        </div>
                        <div
                            style={{
                                background: 'linear-gradient(135deg, rgba(15,31,61,0.08), rgba(26,92,66,0.08))',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                height: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text2)',
                                fontSize: '3rem',
                            }}
                        >
                            🕌
                        </div>
                    </div>
                </div>
            </Section>

            {/* Mission & Values */}
            <Section
                style={{
                    background: 'linear-gradient(135deg, rgba(15,31,61,0.05), rgba(26,92,66,0.04))',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    borderBottom: '1px solid rgba(201,168,76,0.2)',
                }}
            >
                <div className="container">
                    <SectionHeader label={t('about-label')} title={t('mission-title')} />
                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }}>
                        <div className="card">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '12px' }}>
                                {t('mission-h')}
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.85 }}>{t('mission-text')}</p>
                        </div>
                        <div className="card">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '12px' }}>
                                {t('values-h')}
                            </h3>
                            <ul style={{ listStyle: 'none' }}>
                                {(['v1', 'v2', 'v3', 'v4', 'v5'] as const).map((key) => (
                                    <li key={key} style={{ padding: '8px 0', fontSize: '0.95rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>◆</span>
                                        {t(key)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Spiritual Lineage */}
            <Section>
                <div className="container">
                    <SectionHeader label={t('about-label')} title={t('silsila-title')} />
                    <div className="timeline" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {DATA.timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                style={{ position: 'relative', marginBottom: '36px', paddingBottom: '8px' }}
                            >
                                <div className="timeline-dot" />
                                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                                    {item.year}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>
                                    {tData(item.title)}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7 }}>{tData(item.text)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
