
"use client"
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { updateCourse } from "@/app/api/course/route";
import { Modal, Button } from "react-bootstrap";
import { SubmitButton } from "@/app/components/SubmitButton";


export function AssignModal({ users, enrolled, enrolled_teacher, course_id }) {

    const [showModal, setShowModal] = useState(false);

    const [state, updateForm] = useFormState(updateCourse, "")


    const fetchUsers = () => {
        fetch(`/api/users`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                setStudents(students)
                setTeachers(teachers)
                setSelectedStudents(users.map(user => user.student))
                setSelectedTeacher(teacher)

            })
    }

    useEffect(() => {
        if (state.close)
            setShowModal(false)
    }, [state])

    const students = users.filter(user => user.role === "STUDENT")
    const teachers = users.filter(user => user.role === "TEACHER")

    // const submitUsers = (e) => {
    //     e.preventDefault()
    //     let students = selectedStudents.map(student => student.user_id);
    //     fetch(`/api/course?id=${course}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ students: students, teacher: selectedTeacher })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setRender(prev => !prev)
    //             setReload(prev => !prev)
    //             handleClose()

    //         });
    // }

    // useEffect(() => {
    //     fetchUsers()
    // }, [render, users])

    // useEffect(() => {
    //     console.log("New users selected:", selectedStudents, selectedTeacher)

    // }, [selectedStudents, selectedTeacher])


    const handleClose = () => {
        setShowModal(false)
    }

    return <>
        <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>Assign</button>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Users</Modal.Title>
            </Modal.Header>
            <form id="user_assign" action={updateForm}>
                <input type="hidden" name="course_id" value={course_id} />
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="teacher_select" className="form-label">Teacher</label>
                        {/* <input type="text" className="form-control" id="name" value={lessonData.name} onChange={(e) => setLessonData(e.target.value)} autoFocus /> */}
                        <select defaultValue={enrolled_teacher.user_id} name="teacher_select" className="form-select" aria-label="Select" required>
                            {teachers.map((teacher, key) => (
                                <option key={"teacher" + key} value={teacher.user_id}  >{teacher.parent_name}</option>
                            ))
                            }

                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Students</label>
                        {/* <input type="text" className="form-control" id="name" value={lessonData.name} onChange={(e) => setLessonData(e.target.value)} autoFocus /> */}
                        <div className="overflow-y-scroll w-100 rounded rounded-3 p-1" style={{ height: "300px" }}>
                            {students.map((student, iter) => (
                                <div className="form-check" key={"student" + iter}>
                                    <input className="form-check-input" type="checkbox" defaultChecked={enrolled.map(s => s.student_id).includes(student.user_id)} id={student.user_id} name={student.user_id} />
                                    <label className="form-check-label" htmlFor={student.user_id}>
                                        {student.student_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="success" onClick={submitUsers}>
                        Add New
                    </Button> */}
                    <SubmitButton text="Assign" />
                </Modal.Footer>
            </form>
        </Modal>
    </>
}

