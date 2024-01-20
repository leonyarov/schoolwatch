import { Navbar } from "./components/Navbar"
import "@/app/global.css"
// const myFont = localFont({ src: './SuezOne-Regular.ttf' })


export default function DashboardLayout(props) {
    return <main className={`wrapper`}>
        <Navbar />
        <div className={`container content my-3`}>
            {props.children}
        </div>
    </main>
}