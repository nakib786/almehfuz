'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { DATA } from '@/data/siteData';
import { SectionHeader, Section, Breadcrumb } from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';

export default function GalleryPage() {
    const { t, tData } = useLang();
    const [openAlbum, setOpenAlbum] = useState<number | null>(null);

    const handleImageClick = (albumId: number, imageIdx: number) => {
        const openLightbox = (window as unknown as Record<string, (albumId: number, imageIdx: number) => void>).openLightbox;
        if (openLightbox) {
            openLightbox(albumId, imageIdx);
        }
    };

    return (
        <div className="page-enter">
            <div className="container">
                <Breadcrumb items={[{ label: t('nav-home'), href: '/' }, { label: t('nav-gallery') }]} />
            </div>

            <Section>
                <div className="container">
                    <SectionHeader label={t('gal-label')} title={t('gal-title')} subtitle={t('gal-sub')} as="h1" />

                    {/* Album Grid */}
                    <div className="album-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
                        {DATA.albums.map((album) => (
                            <motion.div
                                key={album.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                                className="card"
                                style={{ cursor: 'pointer', textAlign: 'center' }}
                                onClick={() => setOpenAlbum(openAlbum === album.id ? null : album.id)}
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        background: 'linear-gradient(135deg, rgba(15,31,61,0.08), rgba(26,92,66,0.08))',
                                        borderRadius: 'var(--radius)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '16px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <span style={{ fontSize: '3rem', opacity: 0.4 }}>{album.emoji}</span>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--navy)' }}>
                                    {tData(album.title)}
                                </h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>
                                    {album.count} {t('photos')}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Expanded Album */}
                    {openAlbum !== null && (() => {
                        const album = DATA.albums.find((a) => a.id === openAlbum);
                        if (!album) return null;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ marginTop: '48px' }}
                            >
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px', color: 'var(--navy)', textAlign: 'center' }}>
                                    {tData(album.title)}
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                                    {album.images.map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.03 }}
                                            onClick={() => handleImageClick(album.id, idx)}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(15,31,61,0.06), rgba(26,92,66,0.06))',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius)',
                                                aspectRatio: '4/3',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                transition: 'var(--transition)',
                                            }}
                                        >
                                            <span style={{ fontSize: '2rem', opacity: 0.35, marginBottom: '8px' }}>{img.emoji}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text2)', padding: '0 12px', textAlign: 'center' }}>
                                                {tData(img.caption)}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })()}
                </div>
            </Section>
        </div>
    );
}
