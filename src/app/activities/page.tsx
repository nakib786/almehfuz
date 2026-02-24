'use client';

import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { SectionHeader, Section, SectionSm, Breadcrumb } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

export default function ActivitiesPage() {
    const { t, tData, lang } = useLang();

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-activities') }]} />
            </div>

            {/* Schedule */}
            <Section>
                <div className="container">
                    <SectionHeader label={t('act-label')} title={t('act-title')} as="h1" />
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px', color: 'var(--navy)' }}>
                        {t('daily-sched')}
                    </h2>
                    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>{t('th-time')}</th>
                                    <th>{t('th-prayer')}</th>
                                    <th>{t('th-activity')}</th>
                                    <th>{t('th-notes')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DATA.schedule.map((s, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{s.time}</td>
                                        <td style={{ fontWeight: 500, color: 'var(--navy)' }}>{tData(s.label)}</td>
                                        <td>{tData(s.activity)}</td>
                                        <td style={{ fontStyle: 'italic', color: 'var(--text2)' }}>{tData(s.note)}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* Weekly Gatherings */}
            <SectionSm
                style={{
                    background: 'linear-gradient(135deg, rgba(15,31,61,0.04), rgba(26,92,66,0.04))',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    borderBottom: '1px solid rgba(201,168,76,0.2)',
                }}
            >
                <div className="container">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '28px', color: 'var(--navy)', textAlign: 'center' }}>
                        {t('weekly-h')}
                    </h2>
                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {DATA.gatherings.map((g, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="card"
                                style={{ borderTop: '3px solid var(--gold)' }}
                            >
                                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px', fontWeight: 600 }}>
                                    {tData(g.day)}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>
                                    {tData(g.title)}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text2)' }}>
                                    {tData(g.desc)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionSm>

            {/* Upcoming Events */}
            <SectionSm>
                <div className="container">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '28px', color: 'var(--navy)', textAlign: 'center' }}>
                        {t('events-h')}
                    </h2>
                    <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {DATA.events.map((e, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="card"
                                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                            >
                                <div
                                    style={{
                                        flexShrink: 0,
                                        width: '60px',
                                        height: '70px',
                                        background: 'linear-gradient(135deg, var(--navy), #1c3560)',
                                        borderRadius: 'var(--radius)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--gold2)',
                                    }}
                                >
                                    <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1 }}>{e.day}</div>
                                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        {tData(e.month)}
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)' }}>
                                        {tData(e.title)}
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text2)' }}>{tData(e.desc)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionSm>

            {/* Visitor Etiquette */}
            <SectionSm
                style={{
                    background: 'linear-gradient(135deg, rgba(15,31,61,0.04), rgba(26,92,66,0.04))',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                }}
            >
                <div className="container" style={{ maxWidth: '700px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px', color: 'var(--navy)', textAlign: 'center' }}>
                        {t('etiq-title')}
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text2)', textAlign: 'center', marginBottom: '28px', fontStyle: 'italic' }}>
                        {t('etiq-intro')}
                    </p>
                    <ul className="etiquette-list">
                        {DATA.etiquette[lang].map((rule, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                            >
                                {rule}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </SectionSm>
        </div>
    );
}
