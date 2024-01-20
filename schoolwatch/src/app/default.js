"use client"
import Link from "next/link";
import { useRouter } from 'next/router'
export default function Default() {
    // const router = useRouter()
    return <div>
        <h1>Page Not Found</h1>
        {/* <Link href={router.back()}>Back</Link> */}
    </div>;
}