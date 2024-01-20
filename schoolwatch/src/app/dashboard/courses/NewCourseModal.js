"use client"
import { Modal, Alert } from "react-bootstrap";
import { createCourse } from "@/app/api/courses/route";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components/SubmitButton";
export function NewCourseModal() {
    const [show, setShow] = useState(false);
    const [state, createForm] = useFormState(createCourse, "");

    const handleClose = (e) => {
        e.preventDefault();
        setShow(false);
    }

    useEffect(() => {
        if (state.close)
            setShow(false);
    }, [state]);

    return <>
        <button className="btn btn-primary" onClick={() => setShow(true)}>New Course</button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create new course</Modal.Title>
            </Modal.Header>
            {state?.e && <Alert variant="danger" className="m-2">{state.m}</Alert>}
            <form action={createForm}>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Course name</label>
                        <input type="text" className="form-control" id="name" name="name" />
                    </div>

                    <div className="row g-2">
                        <div className="col-4">
                            <label htmlFor="student_rate" className="form-label">Student Rate</label>
                            <div className=" input-group">
                                <input type="number" className="form-control " id="student_rate" name="student_rate" placeholder="0" step={0.01} required />
                                <span className="input-group-text">₪</span>
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="teacher_rate" className="form-label">Teacher Rate</label>
                            <div className=" input-group">
                                <input type="number" className="form-control" id="teacher_rate" name="teacher_rate" placeholder="0" step={0.01} required />
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                    {/* <button type="submit" className="btn btn-primary">Create</button> */}
                    <SubmitButton text="Create" variant="primary" />

                </Modal.Footer>
            </form>
        </Modal >
    </>
}