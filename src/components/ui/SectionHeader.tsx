'use client';

import { ReactNode } from 'react';

interface SectionHeaderProps {
    label: string;
    title: string;
    subtitle?: string;
    titleId?: string;
    as?: 'h1' | 'h2';
}

export function SectionHeader({ label, title, subtitle, titleId, as: Tag = 'h2' }: SectionHeaderProps) {
    return (
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
                {label}
            </span>
            <Tag id={titleId} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, lineHeight: 1.3, color: 'var(--navy)' }}>
                {title}
            </Tag>
            <div className="divider" />
            {subtitle && (
                <p style={{ fontSize: '1rem', color: 'var(--text2)', marginTop: '12px', fontStyle: 'italic' }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

interface BreadcrumbProps {
    items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div style={{ padding: '16px 0', display: 'flex', gap: '8px', fontSize: '0.8rem', color: 'var(--text2)' }}>
            {items.map((item, i) => (
                <span key={i}>
                    {i > 0 && ' › '}
                    {item.href ? (
                        <a href={item.href} style={{ color: 'var(--text2)' }}>{item.label}</a>
                    ) : (
                        <span style={{ color: 'var(--text)' }}>{item.label}</span>
                    )}
                </span>
            ))}
        </div>
    );
}

export function Section({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <section className={`page-enter ${className || ''}`} style={{ padding: '80px 0', ...style }}>
            {children}
        </section>
    );
}

export function SectionSm({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
    return (
        <section className="page-enter" style={{ padding: '48px 0', ...style }}>
            {children}
        </section>
    );
}
