"use client"
import { getSession } from "next-auth/react";
import { styles } from "./styles.module.css"
import { AdminDashboard } from "./AdminDashboard";
import { TeacherDashboard } from "./TeacherDashboard";
import { UserDashboard } from "./UserDashboard";
import { useEffect, useState } from "react";

export default function Page() {
    // const [session, setSession] = useState(null)

    // useEffect(async () => {
    //     var s = await getSession()
    //     setSession(session)
    //     // console.log(session)
    //     return () => {
    //         setSession(null)
    //     }
    // }, [])

    // const admin = session?.u?.role === "ADMIN"
    // const teacher = session?.u?.role === "TEACHER"
    return <section>
        <h1>
            Hello!
        </h1>
        <p>Use the navigation panel to navigate</p>
        {/* {admin ? <AdminDashboard /> : null}
        {teacher ? <TeacherDashboard /> : null}
        {admin && !teacher ? <UserDashboard /> : null} */}
    </section>
}