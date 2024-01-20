"use client"
import Link from "next/link";
import styles from "./styles.module.css"

import { usePathname, useSearchParams } from 'next/navigation'

export function ListItem({ href, content }) {
    let counter = 0;
    const fullName = usePathname()

    return <li key={"item" + counter++} className={`nav-item ${styles.nav_hover}`}>
        <Link href={href} className={`nav-link ${fullName === href ? "active" : "link-dark"}`}>
            {content}

        </Link>
    </li>
}
