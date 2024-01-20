import styles from "./courses.module.css"
import Link from "next/link"
import { getCourses, deleteCourse, getCourses_students, getCourses_teacher } from "@/app/api/courses/route"
import { NewCourseModal } from "./NewCourseModal"
import { getServerSession } from "next-auth"

import { config } from "@/app/api/auth/[...nextauth]/route"

export default async function Courses() {

    const session = await getServerSession(config)
    var courses = []
    if (session?.u?.role === "ADMIN")
        courses = await getCourses()
    else if (session?.u?.role === "STUDENT")
        courses = await getCourses_students(session.u.user_id)
    else if (session?.u?.role === "TEACHER")
        courses = await getCourses_teacher(session.u.user_id)

    // console.log(courses)


    return <section>
        <h1>My Courses:</h1>
        <div className="text-end">
            {session?.u?.role !== "ADMIN" ? <></> : <>
                <NewCourseModal />
            </>}
        </div>
        <ul className={`d-flex flex-column gap-2 mt-5 ${styles.course_select}`}>

            {courses?.map(course =>
                <Course course={course} admin={session?.u?.role === "ADMIN"} />) || "No courses found"}
        </ul>
    </section>
}


function Course({ course, admin = false }) {
    "use client"
    var num = Math.random()
    console.log(course)
    return <li key={num}>
        <div className="d-flex rounded rounded-3 border p-3">
            <Link className={`flex-grow-1 d-flex align-items-center p-0`} href={`/dashboard/courses/${course?.course_id}`} style={{ textDecoration: "inherit", color: "black" }}>
                <div className="d-flex flex-grow-1 flex-column">
                    <h2>{course?.name}</h2>
                    <div className="row">
                        <div className="col-auto"> 👩‍🏫 Teacher: {course?.teacher?.parent_name} </div>
                        <div className="col-auto">
                            👩‍🎓👨‍🎓 Students: {course?.students.join(", ") || "None"}
                        </div>
                    </div>
                </div>
                {!admin ? <></> : <>
                    <div className="g-3 m-1 me-5">
                        <div className="input-group mb-1">
                            <span type="text" className="input-group-text fw-bold" >Teacher Rate:</span>
                            <span className="input-group-text ">{course?.rates?.teacher_rate || 0.00}</span>
                            <span className="input-group-text ">$</span>
                        </div>
                        <div className="input-group">
                            <span type="text" className="input-group-text fw-bold" >Student Rate:</span>
                            <span className="input-group-text">{course?.rates?.student_rate || 0.00}</span>
                            <span className="input-group-text">₪</span>
                        </div>
                    </div>
                </>
                }
            </Link>
            {!admin ? <></> : <>
                <form action={deleteCourse} className="ms-auto d-flex align-items-start p-1">
                    <input type="hidden" name="course_id" value={course?.course_id} />
                    <button type="submit" className="btn btn-danger z-2">Delete</button>
                </form>
            </>}
        </div>
    </li>
}