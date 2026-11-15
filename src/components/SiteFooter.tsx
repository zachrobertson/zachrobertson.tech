import styles from "./SiteFooter.module.css";

const LINKS = [
    { href: "https://github.com/zachrobertson", label: "github" },
    { href: "https://www.linkedin.com/in/zachrobertson-tech/", label: "linkedin" },
    { href: "https://twitter.com/ZachRTech", label: "twitter" },
    { href: "/api/rss/feed", label: "rss" },
];

export default function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <span>© {new Date().getFullYear()} Zach Robertson</span>
                <nav aria-label="Elsewhere" className={styles.links}>
                    {LINKS.map(({ href, label }) => (
                        <a key={href} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                            {label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
