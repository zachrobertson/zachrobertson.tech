"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SiteHeader.module.css";

const LINKS = [
    { href: "/blogs", label: "writing", match: ["/blogs", "/blog"] },
    { href: "/about", label: "about", match: ["/about"] },
];

export default function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.brand}>
                    <span className={styles.mark} aria-hidden="true">zr</span>
                    <span>zachrobertson.tech</span>
                </Link>
                <nav aria-label="Primary" className={styles.nav}>
                    {LINKS.map(({ href, label, match }) => {
                        const active = match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
                        return (
                            <Link key={href} href={href} aria-current={active ? "page" : undefined} className={styles.link}>
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
