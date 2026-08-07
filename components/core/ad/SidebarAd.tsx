'use client'

import { useEffect, useState } from "react";

export default function SidebarAd(){

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
        console.error(err);
        }
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="w-100 h-100 bg-white">
        <ins className="adsbygoogle block"
              data-ad-client="ca-pub-2755508775935324"
              data-ad-slot="8354558730"
              data-ad-format="auto"
              data-full-width-responsive="true" />
        </div>
    )
}