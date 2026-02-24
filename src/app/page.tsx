'use client';

import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { SectionHeader, Section, SectionSm } from '@/components/ui/SectionHeader';
import TeachingCard from '@/components/TeachingCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Image from 'next/image';

export default function HomePage() {
  const { t, tData } = useLang();

  return (
    <div className="page-enter">
      {/* Hero */}
      <section
        aria-label="Welcome"
        style={{
          minHeight: '85vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #060e18 0%, #0f1f3d 30%, #0d3b2e 65%, #1a5c42 100%)' }} />
        <div className="hero-pattern" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,37,25,0.3) 0%, rgba(44,37,25,0.6) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: 'white', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'inline-block',
              padding: '40px',
              border: '1px solid rgba(201,168,76,0.25)',
              borderTop: '3px solid rgba(201,168,76,0.5)',
              borderBottom: '3px solid rgba(201,168,76,0.5)',
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="logo-glow"
              style={{ marginBottom: '32px' }}
            >
              <Image
                src="/logo.svg"
                alt="Al Mehfuz"
                width={120}
                height={120}
                style={{
                  margin: '0 auto',
                  filter: 'drop-shadow(0 0 20px rgba(232, 201, 106, 0.4))'
                }}
              />
            </motion.div>
            <span
              className="hero-bismillah"
              style={{
                fontFamily: 'var(--font-ar)',
                fontSize: '2.2rem',
                color: 'var(--gold2)',
                marginBottom: '24px',
                display: 'block',
              }}
            >
              بِسْمِ اللَّٰهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '20px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {t('hero-title')}
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '560px',
                margin: '0 auto 36px',
                fontStyle: 'italic',
              }}
            >
              {t('hero-sub')}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/activities"
                style={{
                  padding: '14px 28px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, var(--gold), #a07830)',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'var(--transition)',
                }}
              >
                {t('cta-activities')}
              </Link>
              <Link
                href="/teachings"
                style={{
                  padding: '14px 28px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  border: '1px solid rgba(232,201,106,0.6)',
                  color: 'var(--gold2)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'var(--transition)',
                }}
              >
                {t('cta-teachings')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Purpose */}
      <Section>
        <div className="container">
          <SectionHeader label={t('purpose-label')} title={t('purpose-title')} subtitle={t('purpose-sub')} titleId="purpose-heading" />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {[
              { icon: '🌿', titleKey: 'p1-title', textKey: 'p1-text' },
              { icon: '📿', titleKey: 'p2-title', textKey: 'p2-text' },
              { icon: '📖', titleKey: 'p3-title', textKey: 'p3-text' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card"
                style={{ textAlign: 'center', padding: '40px 28px', borderTop: '3px solid transparent' }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(26,92,66,0.12), rgba(201,168,76,0.15))',
                    border: '2px solid rgba(201,168,76,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 16px rgba(201,168,76,0.1)',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px', color: 'var(--navy)' }}>
                  {t(item.titleKey)}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.8 }}>{t(item.textKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Today's Schedule Preview */}
      <SectionSm
        style={{
          background: 'linear-gradient(135deg, rgba(15,31,61,0.04), rgba(26,92,66,0.04))',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              {t('sched-label')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, lineHeight: 1.3, color: 'var(--navy)' }}>
              {t('sched-title')}
            </h2>
          </div>
          <ul style={{ listStyle: 'none' }}>
            {DATA.schedule.slice(0, 5).map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  marginBottom: '8px',
                  transition: 'var(--transition)',
                  borderLeft: '4px solid transparent',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700, minWidth: '80px', letterSpacing: '0.04em' }}>
                  {s.time}
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--navy)', fontWeight: 500 }}>{tData(s.label)}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text2)', fontStyle: 'italic' }}>{tData(s.note)}</span>
              </motion.li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              href="/activities"
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'var(--navy)',
                color: 'var(--gold2)',
                border: '1px solid rgba(201,168,76,0.3)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t('full-sched')}
            </Link>
          </div>
        </div>
      </SectionSm>

      {/* Latest Teachings */}
      <Section>
        <div className="container">
          <SectionHeader label={t('teachings-label')} title={t('teachings-title')} />
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {DATA.teachings.slice(0, 3).map((post) => (
              <TeachingCard key={post.id} post={post} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link
              href="/teachings"
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'var(--navy)',
                color: 'var(--gold2)',
                border: '1px solid rgba(201,168,76,0.3)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t('all-teachings')}
            </Link>
          </div>
        </div>
      </Section>

      {/* Visit Us */}
      <SectionSm
        style={{
          background: 'linear-gradient(135deg, rgba(15,31,61,0.05), rgba(26,92,66,0.05))',
          borderTop: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              {t('visit-label')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600, lineHeight: 1.3, color: 'var(--navy)' }}>
              {t('visit-title')}
            </h2>
          </div>
          <div className="visit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '2px' }}>📍</div>
                <div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                    {t('addr-label')}
                  </div>
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{t('addr-val')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '2px' }}>🕐</div>
                <div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                    {t('hours-label')}
                  </div>
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{t('hours-val')}</div>
                </div>
              </div>
              <Link
                href="/contact"
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, var(--gold), #a07830)',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {t('contact-btn')}
              </Link>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15,31,61,0.06), rgba(26,92,66,0.06))',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 'var(--radius)',
                height: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text2)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              <span>
                🗺 Map placeholder
                <br />
                <small>Embed your map here</small>
              </span>
            </div>
          </div>
        </div>
      </SectionSm>
    </div>
  );
}
