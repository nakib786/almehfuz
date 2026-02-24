'use client';

import { useState, useCallback, useEffect } from 'react';
import { DATA, Album } from '@/data/siteData';
import { useLang } from '@/context/LangContext';

export default function Lightbox() {
    const { tData } = useLang();
    const [isOpen, setIsOpen] = useState(false);
    const [albumId, setAlbumId] = useState<number | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const album = albumId !== null ? DATA.albums.find((a) => a.id === albumId) : null;
    const image = album ? album.images[imageIndex] : null;

    const open = useCallback((aId: number, idx: number) => {
        setAlbumId(aId);
        setImageIndex(idx);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = '';
    }, []);

    const nav = useCallback(
        (dir: number) => {
            if (!album) return;
            setImageIndex((prev) => (prev + dir + album.images.length) % album.images.length);
        },
        [album]
    );

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (!isOpen) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') nav(-1);
            if (e.key === 'ArrowRight') nav(1);
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, close, nav]);

    // Expose open function globally
    useEffect(() => {
        (window as unknown as Record<string, unknown>).openLightbox = open;
        return () => {
            delete (window as unknown as Record<string, unknown>).openLightbox;
        };
    }, [open]);

    if (!isOpen || !image) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 500,
                background: 'rgba(0,0,0,0.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div style={{ position: 'relative', maxWidth: '800px', width: '90%', textAlign: 'center' }}>
                <button
                    onClick={close}
                    aria-label="Close gallery"
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        right: 0,
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        opacity: 0.7,
                    }}
                >
                    ✕
                </button>
                <div
                    style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        background: '#2a2520',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <span style={{ fontSize: '4rem', opacity: 0.3 }}>{image.emoji}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '16px', fontStyle: 'italic' }}>
                    {tData(image.caption)}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
                    <button
                        onClick={() => nav(-1)}
                        style={{
                            background: 'rgba(201,168,76,0.1)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: 'var(--gold2)',
                            padding: '8px 20px',
                            borderRadius: 'var(--radius)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                        }}
                    >
                        ← Prev
                    </button>
                    <span style={{ color: 'rgba(255,255,255,0.6)', alignSelf: 'center', fontSize: '0.85rem' }}>
                        {imageIndex + 1} / {album!.images.length}
                    </span>
                    <button
                        onClick={() => nav(1)}
                        style={{
                            background: 'rgba(201,168,76,0.1)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: 'var(--gold2)',
                            padding: '8px 20px',
                            borderRadius: 'var(--radius)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                        }}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}
