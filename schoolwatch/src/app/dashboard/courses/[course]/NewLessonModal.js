"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom";
import { createLesson } from "@/app/api/lesson/route";
import { Modal, Button } from "react-bootstrap";
import { SubmitButton } from "@/app/components/SubmitButton";

export function NewLessonModal({ course }) {

    const [showModal, setShowModal] = useState(false);
    const [state, newLessonForm] = useFormState(createLesson, "")

    const handleClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if (state.close) {
            setShowModal(false)
        }
    }, [state])

    return <>
        <button className="btn btn-primary ms-auto" onClick={() => setShowModal(true)}>New Lesson</button>

        < Modal show={showModal} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>New Lesson</Modal.Title>
            </Modal.Header>
            <form action={newLessonForm} id="new_lesson">
                <Modal.Body>
                    <input type="hidden" name="id" value={course} />
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Lesson Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter lesson name..." autoFocus />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="success" form="new_lesson" type="submit">
                        Add New
                    </Button> */}
                    <SubmitButton form="new_lesson" text="Add New" variant="success" />
                </Modal.Footer>
            </form>
        </Modal >
    </>
}
