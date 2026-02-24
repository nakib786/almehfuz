'use client';

import { useState, useRef, useEffect } from 'react';

const AUDIO_PATH = '/AASTAN HEI MASTERD.mp3';
const CACHE_NAME = 'bg-music-cache-v1';

export default function BackgroundMusic() {
    const [volume, setVolume] = useState(0.05); // Lower default volume
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio();
        audio.src = AUDIO_PATH;
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Caching logic
        const cacheAudio = async () => {
            try {
                if ('caches' in window) {
                    const cache = await caches.open(CACHE_NAME);
                    const response = await cache.match(AUDIO_PATH);
                    if (!response) {
                        await cache.add(AUDIO_PATH);
                    }
                }
            } catch (err) {
                console.warn('Cache API error:', err);
            }
        };

        cacheAudio();

        const handleCanPlay = () => setIsLoaded(true);
        audio.addEventListener('canplaythrough', handleCanPlay);

        // Attempt autoplay
        const attemptPlay = () => {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                setIsPlaying(false);
            });
        };

        attemptPlay();

        const onFirstInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                attemptPlay();
                window.removeEventListener('click', onFirstInteraction);
                window.removeEventListener('keydown', onFirstInteraction);
                window.removeEventListener('touchstart', onFirstInteraction);
            }
        };

        window.addEventListener('click', onFirstInteraction);
        window.addEventListener('keydown', onFirstInteraction);
        window.addEventListener('touchstart', onFirstInteraction);

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlay);
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
            window.removeEventListener('touchstart', onFirstInteraction);
            audio.pause();
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current) return;
        const newMute = !isMuted;
        audioRef.current.muted = newMute;
        setIsMuted(newMute);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
            if (newVol > 0 && isMuted) {
                audioRef.current.muted = false;
                setIsMuted(false);
            }
        }
    };

    if (!isLoaded) return null;

    return (
        <div
            className="music-controls"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(15, 31, 61, 0.9)',
                backdropFilter: 'blur(16px)',
                padding: '8px 16px',
                borderRadius: '40px',
                border: '1px solid var(--gold)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* Visualizer bars when playing */}
            {isPlaying && !isMuted && (
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px', marginRight: '4px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`bar bar-${i}`} />
                    ))}
                </div>
            )}

            <button
                onClick={togglePlay}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '50%',
                    transition: 'var(--transition)',
                }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                width: showVolume ? '100px' : '36px',
                transition: 'width 0.3s ease',
                overflow: 'hidden'
            }}>
                <button
                    onClick={toggleMute}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gold)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '50%',
                        transition: 'var(--transition)',
                        flexShrink: 0
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted || volume === 0 ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.41.32-.86.58-1.35.77v2.06c1.02-.22 1.97-.68 2.79-1.33L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                    )}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{
                        width: '60px',
                        cursor: 'pointer',
                        accentColor: 'var(--gold)',
                        height: '4px',
                        opacity: showVolume ? 1 : 0,
                        pointerEvents: showVolume ? 'auto' : 'none',
                        transition: 'opacity 0.2s ease',
                    }}
                />
            </div>

            <style jsx>{`
                .bar {
                    width: 3px;
                    background: var(--gold);
                    border-radius: 2px;
                    animation: bounce 1s ease-in-out infinite;
                }
                .bar-1 { height: 60%; animation-delay: 0s; }
                .bar-2 { height: 100%; animation-delay: 0.2s; }
                .bar-3 { height: 80%; animation-delay: 0.4s; }

                @keyframes bounce {
                    0%, 100% { transform: scaleY(0.7); }
                    50% { transform: scaleY(1.3); }
                }

                .music-controls:hover {
                    box-shadow: 0 12px 48px rgba(0,0,0,0.5);
                    transform: translateY(-2px);
                }

                input[type='range'] {
                    -webkit-appearance: none;
                    background: rgba(201, 168, 76, 0.2);
                    border-radius: 2px;
                }

                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    background: var(--gold);
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,0,0,0.3);
                }
            `}</style>
        </div>
    );
}
