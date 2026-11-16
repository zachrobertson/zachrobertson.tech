"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const LINKS = [
    { href: "/blogs", label: "projects", match: ["/blogs", "/blog"] },
    { href: "/about", label: "about", match: ["/about"] },
];

export default function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.brand}>
                    Zach Robertson
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
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
