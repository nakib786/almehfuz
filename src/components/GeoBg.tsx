'use client';

export default function GeoBg() {
    return (
        <div className="geo-bg" aria-hidden="true">
            <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="star8" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                        <polygon points="60,5 72,45 110,45 80,68 92,108 60,85 28,108 40,68 10,45 48,45" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
                        <rect x="40" y="40" width="40" height="40" transform="rotate(45 60 60)" fill="none" stroke="#1a5c42" strokeWidth="0.6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#star8)" />
            </svg>
        </div>
    );
}
