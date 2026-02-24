import { MetadataRoute } from 'next';
import { DATA } from '@/data/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://almehfuz.org';

    // Base routes
    const routes = [
        '',
        '/about',
        '/activities',
        '/teachings',
        '/gallery',
        '/contact',
        '/site-map',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic teaching routes
    const teachingRoutes = DATA.teachings.map((teaching) => ({
        url: `${baseUrl}/teachings/${teaching.slug}`,
        lastModified: new Date(teaching.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...teachingRoutes];
}
