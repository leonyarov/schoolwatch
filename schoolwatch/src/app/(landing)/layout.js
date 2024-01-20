
import { NavBar } from "@/app/components/navbar/Navbar";
const myFont = localFont({ src: '../SuezOne-Regular.ttf' })
import '../styles/global.scss'
import styles from "../global.css"
import localFont from 'next/font/local'



export default function MainLayout(props) {
    return <div className={myFont.className}> 
        <NavBar />
        {props.children}

    </div>
}