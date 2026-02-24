'use client';

import { useLang } from '@/context/LangContext';
import { Teaching } from '@/data/siteData';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface TeachingCardProps {
    post: Teaching;
}

export default function TeachingCard({ post }: TeachingCardProps) {
    const { tData, t } = useLang();
    const router = useRouter();

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push(`/teachings/${post.slug}`)}
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'var(--transition)',
                cursor: 'pointer',
                borderBottom: '3px solid transparent',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && router.push(`/teachings/${post.slug}`)}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontSize: '0.7rem',
                            padding: '3px 10px',
                            borderRadius: '20px',
                            background: 'rgba(26,92,66,0.12)',
                            color: 'var(--accent)',
                            border: '1px solid rgba(26,92,66,0.2)',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {tag}
                    </span>
                ))}
                <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', background: 'var(--bg2)', color: 'var(--text2)', letterSpacing: '0.06em' }}>
                    {post.date}
                </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3, color: 'var(--navy)' }}>
                {tData(post.title)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.8 }}>
                {tData(post.excerpt).substring(0, 120)}...
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>⏱ {post.readTime}</span>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                    {t('read-more')}
                </span>
            </div>
        </motion.div>
    );
}
