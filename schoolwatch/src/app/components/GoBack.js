"use client"
import { useRouter } from "next/navigation"

export function GoBack() {
    const router = useRouter()
    return <button className="btn btn-secondary" onClick={() => router.back() }>←</button>

}