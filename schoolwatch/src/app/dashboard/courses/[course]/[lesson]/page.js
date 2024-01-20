import { Modal, Button } from 'react-bootstrap';
import { GoBack } from '@/app/components/GoBack';
import styles from "./lesson.module.css"
import { Edit } from './edit';
import { getLesson } from '@/app/api/lesson/route';
import { getServerSession } from 'next-auth';
import { config } from '@/app/api/auth/[...nextauth]/route';
// const SunEditor = dynamic(() => import("suneditor-react"), {
//     ssr: false,
// });


export default async function Lesson({ params }) {

    const lesson = params.lesson
    const lessonData = await getLesson(lesson)

    const session = await getServerSession(config)
    const admin = session.u.role === "ADMIN"
    const teacher = session.u.role === "TEACHER"

    if (!lessonData) return <>
        <GoBack />
        <p>Lesson not found</p>
    </>

    return <section>

        <GoBack />
        <div className="hstack">
            <div className="vstack">

                <h1>Lesson </h1>
                <p>{lessonData?.name || "Default"}</p>
            </div>
        </div>
        <Edit data={lessonData} lesson={lesson} admin={admin} teacher={teacher} />

    </section>
}

