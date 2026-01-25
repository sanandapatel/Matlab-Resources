"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Image
                src="/logo1.png"
                alt="Matlab Handbook for DSP Logo"
                width={32}
                height={32}
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Image
            src="/logo1.png"
            alt="Matlab Handbook for DSP Logo"
            width={32}
            height={32}
            style={isDark ? { filter: "invert(1)" } : {}}
        />
    );
}
