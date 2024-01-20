
import styles from "./styles.module.css"
import { ListItem } from "./ListItem";
import { UserDisplay } from "./UserDisplay";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";

export async function Navbar() {

    // const user = await getUser("user1")
    const session = await getServerSession(config)

    return <nav className={`vstack ${styles.sidebar} bg-body-secondary p-3 sticky-top`}>
        <div className={`d-flex flex-column ${styles.profile} rounded rounded-3 bg-body-tertiary p-3`}>
            <UserDisplay />
        </div>
        <hr />
        <ul className="nav nav-pills flex-column gap-1">
            {
                session.u.role === "ADMIN" ?
                    <>
                        <ListItem href="/dashboard/users" content={"Users"} />
                        <li className="pe-4"><hr></hr></li>
                    </>
                    : null
            }
            <ListItem href="/dashboard" content={"Dashboard"} />
            <ListItem href="/dashboard/courses" content={"Courses"} />
            <ListItem href="/dashboard/account" content={"Account"} />

        </ul>
        <hr className="mt-auto" />
        <div className="">
            <p>2023</p>
            <a href="/">Go Back</a>
        </div>
    </nav>
}
