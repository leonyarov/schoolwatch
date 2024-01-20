"use client"
import { useEffect, useState } from "react"
import { getSession, signOut, useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"
export function UserDisplay() {

    const [session, setSession] = useState(null);
    const [image, setImage] = useState(null);


    useEffect(() => {
        async function logic() {
            const result = await getSession();
            setSession(result);
            var img = supabase.storage.from("media").getPublicUrl("public/" + result?.u.user_id + ".png")
            setImage(img.data.publicUrl)
        }
        logic()
    }, []);

    return <>
        <div className="hstack">
            <img src={image} alt="profile" width={70} height={70} className="rounded-circle" />
            <button className="btn btn-danger ms-auto" onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        </div>
        <p className="mt-3 mb-0">{session?.u.parent_name}</p>
        <p className=" mb-0">{session?.u.student_name}</p>
    </>
}
