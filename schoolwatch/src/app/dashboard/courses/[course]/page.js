import Link from "next/link";
import styles from "./course.module.css"
import { getCourse } from "@/app/api/course/route";
import { GoBack } from "@/app/components/GoBack";
import { AssignModal } from "./AssignModal";
import { Button, Badge } from "react-bootstrap";

import { NewLessonModal } from "./NewLessonModal";
import { getUsers } from "@/app/api/actions";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";
import { BandaidFill, CalendarWeekFill, CheckCircleFill, Clock, ClockFill, HouseDownFill, SignDoNotEnter, SignDoNotEnterFill, SlashCircleFill } from "react-bootstrap-icons";

export default async function Course({ params }) {

    var counter = 0;
    const session = await getServerSession(config)

    const data = await getCourse(params.course)
    const users = await getUsers()

    const admin = session.u.role === "ADMIN"
    const teacher = session.u.role === "TEACHER"

    return <section>
        <GoBack />
        <div className="d-flex align-items-start">
            <div>
                <h1 className="mt-0 pt-0"> Course: {data?.name} </h1>
                {/* Course description */}
                <h2 className="h6"></h2>
            </div>
            <div className="d-flex flex-column align-self-end ms-auto">
                <div className="rounded rounded-3 bg-body-secondary p-3">
                    <div className="mb-0 fw-bold">Teacher:</div>
                    <div className="mb-0">👩‍🏫 {data.teacher.parent_name || "No teacher assigned"}</div>
                    <div className="mb-0 fw-bold">Students:</div>
                    {data.students.map((student, iter) => (
                        <div key={iter} className="mb-0">🙍‍♂️ {student.student.student_name}</div>
                    ))}
                </div>

                <div className="text-end my-2 align-self-end">
                    {admin ?
                        <AssignModal users={users} enrolled={data.students} enrolled_teacher={data.teacher} course_id={params.course} />
                        : <></>
                    }
                    {/* <Button className="btn btn-primary" href={`/dashboard/calendar?id=${data.teacher_name}&course=${data.course}`}>View Calendar</Button> */}
                </div>
            </div>

        </div>
        <div className="hstack my-5">
            <h2>Lessons</h2>
            {admin || teacher ?
                <NewLessonModal course={params.course} />
                : <></>
            }
        </div>
        <ul className={`list-group  list-group-flush gap-3  ${styles.course_select}`}>
            {data?.lessons?.map(lesson => (
                <Lesson key={counter++} lesson={lesson} course={params.course} />
            ))}
            {data?.lessons?.length === 0 ? <p className="text-center">No lessons yet</p> : null}
        </ul>

        {/* 
        <hr className="my-5"></hr>

        <div className="hstack my-5">
            <h2>Exams</h2>
            <button className="btn btn-primary ms-auto">New Exam</button>
        </div>
        <ul className={`list-group  list-group-flush gap-3  ${styles.course_select}`}>
            {exams.map(exam => (
                <Lesson id={exam.lesson_id} name={counter2++} desc={exam.description || ""} date={exam.lesson_date} grade={exam.grade} hw={exam.homework} given={exam.given} />
            ))}
        </ul> */}

    </section>
}

function Lesson({ lesson, course }) {
    return <li className={`bg-body-secondary rounded rounded-3 list-group-item p-3`} style={{ cursor: "pointer" }}>
        <Link href={`/dashboard/courses/${course}/${lesson.lesson_id}`} style={{ textDecoration: "inherit", color: "black" }}>
            <div className="hstack fs-5">
                <h3>{lesson.name}</h3>
                <Badge className="ms-auto d-flex align-items center">
                    <CalendarWeekFill className="mx-1" />
                    {lesson.lesson_date.toLocaleString("he-IL").split(",")[0]}
                    {/* <span className="ms-auto"> Grade: {lesson.grade} / 100 </span> */}
                </Badge>
                <Badge bg="success" className="d-flex align-items center ms-1">
                    <ClockFill className="mx-1" />
                    {lesson.lesson_date.toLocaleString("he-IL").split(",")[1]}
                </Badge>
            </div>
            <div className="hstack gap-2">
                <span className="mb-0 pb-0">{lesson.lesson_text} </span>
                <Badge bg="dark" className="ms-auto">
                    <HouseDownFill className="mx-1" />
                    Homework:
                    <span className="mx-1">
                        {lesson.homework ? <CheckCircleFill color="green" /> : <SlashCircleFill color="red" />}
                    </span>
                </Badge>
                <Badge bg="dark">
                    Complete:
                    <span className="mx-1">
                        {lesson.given ? <CheckCircleFill color="green" /> : <SlashCircleFill color="red" />}
                    </span>
                </Badge>
            </div>
        </Link>
    </li >
}
