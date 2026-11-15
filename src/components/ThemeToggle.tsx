"use client";

import { useSyncExternalStore } from "react";

import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const query = () => window.matchMedia("(prefers-color-scheme: dark)");

function subscribe(onChange: () => void) {
    const media = query();
    media.addEventListener("change", onChange);
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
        media.removeEventListener("change", onChange);
        observer.disconnect();
    };
}

// An explicit choice lives on <html data-theme>; otherwise follow the system.
function getTheme(): Theme {
    const chosen = document.documentElement.dataset.theme;
    if (chosen === "light" || chosen === "dark") return chosen;
    return query().matches ? "dark" : "light";
}

export default function ThemeToggle() {
    const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
    const next: Theme = theme === "dark" ? "light" : "dark";

    const toggle = () => {
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // Storage can be blocked; the choice still applies for this visit.
        }
    };

    return (
        <button type="button" onClick={toggle} className={styles.button} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {theme === "dark" ? (
                    <>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </>
                ) : (
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                )}
            </svg>
        </button>
    );
}
