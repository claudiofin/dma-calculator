import React from 'react';
import Head from 'expo-router/head';

// This component is Web-only by nature of Head, but safe to render on native 
// (it just won't do anything visible for meta tags).

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
}

export const SEOHead = ({
    title = "DMA Calculator 2026 | App Store & Google Play Fees",
    description = "Simulate your savings under the new EU Digital Markets Act. Compare Apple Core Technology Fee, Store Services, and Payment Processing costs.",
    image = "https://your-domain.com/og-image.png" // Placeholder
}: SEOHeadProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};
