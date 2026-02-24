'use client';

import { useState, FormEvent } from 'react';
import { useLang } from '@/context/LangContext';
import { SectionHeader, Section, Breadcrumb } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const { t } = useLang();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) return;
        setSubmitted(true);
    };

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-contact') }]} />
            </div>

            <Section>
                <div className="container">
                    <SectionHeader label={t('contact-label')} title={t('contact-title')} as="h1" />

                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'start' }}>
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="card"
                        >
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '24px' }}>
                                {t('contact-form-h')}
                            </h2>

                            {submitted ? (
                                <div
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(26,92,66,0.1), rgba(201,168,76,0.08))',
                                        padding: '32px 24px',
                                        borderRadius: 'var(--radius)',
                                        textAlign: 'center',
                                        border: '1px solid rgba(26,92,66,0.3)',
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                                    <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--accent)' }}>
                                        {t('form-success')}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '6px', fontWeight: 600 }}>
                                            {t('form-name')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '6px', fontWeight: 600 }}>
                                            {t('form-contact')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '6px', fontWeight: 600 }}>
                                            {t('form-msg')}
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '14px 24px',
                                            borderRadius: 'var(--radius)',
                                            fontSize: '0.9rem',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            background: 'linear-gradient(135deg, var(--accent), #0d3b2e)',
                                            color: 'var(--gold2)',
                                            border: '1px solid rgba(201,168,76,0.3)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'var(--transition)',
                                        }}
                                    >
                                        {t('form-submit')}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            <div className="card" style={{ marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '20px' }}>
                                    {t('contact-info-h')}
                                </h2>
                                {[
                                    { icon: '📍', label: t('addr-label'), value: t('addr-val') },
                                    { icon: '📞', label: t('phone-label'), value: '+00 000 000 0000' },
                                    { icon: '✉', label: t('email-label'), value: 'info@almehfuz.example' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                                        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '4px' }}>
                                                {item.label}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card">
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>
                                    {t('visiting-h')}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                    {t('visiting-hours')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
