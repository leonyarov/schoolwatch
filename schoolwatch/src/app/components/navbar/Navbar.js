"use client"
import styles from "./navbar.module.css"
import Script from 'next/script'
import { signIn, signOut, useSession } from "next-auth/react"

export function NavBar() {


    const { data: session, status } = useSession()
    return <nav className={`${styles.navbar} navbar navbar-expand-lg px-2  shadow  sticky-top`}>
        <div className="container-fluid">
            <a className={`navbar-brand ${styles.text}`} href="#">Navbar</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li key="1" className="nav-item">
                        <a className={`nav-link active ${styles.text}`} aria-current="page" href="#">Home</a>
                    </li>
                    <li key="2" className="nav-item">
                        <a className={`nav-link active ${styles.text}`} href="#prices">Pricing</a>
                    </li>
                    {status === "authenticated" ? <li className="nav-item ms-3"> <span className="nav-link ">{session.user.email}</span></li> : <></>}
                </ul>
                {status === "authenticated" ?
                    <>
                        <button type="button" className={`btn btn-danger ms-auto px-3`} onClick={() => signOut()}>
                            Sign Out
                        </button>
                        <a className={`btn btn-primary ms-2 px-3`} href="/dashboard">
                            Dashboard
                        </a>
                    </>
                    :
                    <button type="button" className={`btn btn-primary ms-auto px-3 ${styles.login}`} data-bs-toggle="modal" data-bs-target="#loginModal">
                        Sign In
                    </button>
                }


            </div>
        </div>


    </nav>


}