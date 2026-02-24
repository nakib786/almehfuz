'use client';

import { useState, useMemo } from 'react';
import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { SectionHeader, Section, Breadcrumb } from '@/components/ui/SectionHeader';
import TeachingCard from '@/components/TeachingCard';

export default function TeachingsPage() {
    const { t, tData } = useLang();
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('All');

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        DATA.teachings.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
        return ['All', ...Array.from(tags)];
    }, []);

    const filtered = useMemo(() => {
        return DATA.teachings.filter((p) => {
            const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);
            const matchesSearch = !search || tData(p.title).toLowerCase().includes(search.toLowerCase()) || tData(p.excerpt).toLowerCase().includes(search.toLowerCase());
            return matchesTag && matchesSearch;
        });
    }, [search, activeTag, tData]);

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-teachings') }]} />
            </div>

            <Section>
                <div className="container">
                    <SectionHeader label={t('teach-label')} title={t('teach-page-title')} as="h1" />

                    {/* Search */}
                    <div style={{ maxWidth: '500px', margin: '0 auto 20px' }}>
                        <input
                            type="search"
                            placeholder={t('search-ph')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                background: 'var(--surface)',
                                fontFamily: 'inherit',
                                fontSize: '0.95rem',
                                outline: 'none',
                            }}
                        />
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid',
                                    borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                                    background: activeTag === tag ? 'var(--accent)' : 'transparent',
                                    color: activeTag === tag ? 'white' : 'var(--text2)',
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)',
                                }}
                            >
                                {tag === 'All' ? t('all') : tag}
                            </button>
                        ))}
                    </div>

                    {/* Results */}
                    {filtered.length > 0 ? (
                        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
                            {filtered.map((post) => (
                                <TeachingCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)', fontStyle: 'italic' }}>
                            {t('no-results')}
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}
