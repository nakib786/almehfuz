'use client';

import { use } from 'react';
import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { Section, Breadcrumb } from '@/components/ui/SectionHeader';
import TeachingCard from '@/components/TeachingCard';
import Link from 'next/link';

export default function TeachingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t, tData, lang } = useLang();
    const post = DATA.teachings.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="page-enter container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--navy)' }}>Teaching not found</h1>
                <Link href="/teachings" style={{ marginTop: '20px', display: 'inline-block', color: 'var(--accent)' }}>
                    ← {t('back-teachings')}
                </Link>
            </div>
        );
    }

    const related = DATA.teachings.filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))).slice(0, 2);

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: t('nav-home'), href: '/' },
                        { label: t('nav-teachings'), href: '/teachings' },
                        { label: tData(post.title) },
                    ]}
                />
            </div>

            <Section>
                <div className="container" style={{ maxWidth: '800px' }}>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: '0.7rem',
                                    padding: '3px 12px',
                                    borderRadius: '20px',
                                    background: 'rgba(26,92,66,0.12)',
                                    color: 'var(--accent)',
                                    border: '1px solid rgba(26,92,66,0.2)',
                                    fontWeight: 600,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, lineHeight: 1.3, color: 'var(--navy)', marginBottom: '16px' }}>
                        {tData(post.title)}
                    </h1>

                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text2)', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                        <span>📅 {post.date}</span>
                        <span>⏱ {post.readTime}</span>
                    </div>

                    <div
                        className="teaching-content"
                        dangerouslySetInnerHTML={{ __html: post.content[lang] || post.content.en }}
                        style={{
                            fontSize: '1.05rem',
                            lineHeight: 1.9,
                        }}
                    />

                    <style jsx global>{`
            .teaching-content h2 {
              font-size: 1.4rem;
              font-weight: 600;
              margin: 36px 0 16px;
              color: var(--navy);
            }
            .teaching-content p {
              margin-bottom: 20px;
            }
            .teaching-content blockquote {
              padding: 20px 24px;
              background: linear-gradient(135deg, rgba(15,31,61,0.05), rgba(26,92,66,0.05));
              border-left: 4px solid var(--gold);
              margin: 24px 0;
              font-style: italic;
              color: var(--navy);
              border-radius: 0 var(--radius) var(--radius) 0;
            }
            [dir="rtl"] .teaching-content blockquote {
              border-left: none;
              border-right: 4px solid var(--gold);
              border-radius: var(--radius) 0 0 var(--radius);
            }
          `}</style>

                    {/* Back link */}
                    <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                        <Link href="/teachings" style={{ fontSize: '0.85rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            ← {t('back-teachings')}
                        </Link>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div style={{ marginTop: '48px' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', color: 'var(--navy)' }}>
                                {t('related-h')}
                            </h2>
                            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                {related.map((p) => (
                                    <TeachingCard key={p.id} post={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}
