
"use client"
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { lessonDelete } from "@/app/api/lesson/route";
import { Modal, Button } from "react-bootstrap";
import { SubmitButton } from "@/app/components/SubmitButton";
import { useRouter } from "next/navigation";



export function DeleteModal({ lesson_id }) {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);

    const [state, deleteForm] = useFormState(lessonDelete, "")

    useEffect(() => {
        if (state.close) {
            setShowModal(false)
            router.back()
        }
    }, [state])


    const handleClose = () => {
        setShowModal(false)
    }

    return <>
        <button className="btn btn-danger ms-2 flex-grow-0 align-self-end" onClick={() => setShowModal(true)}>Delete</button>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Lesson</Modal.Title>
            </Modal.Header>
            <form id="lesson_delete" action={deleteForm}>
                <input type="hidden" name="lesson_id" value={lesson_id} />

                <Modal.Body>
                    <p>
                        Are you sure?
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <SubmitButton text="Delete" variant="danger" />
                </Modal.Footer>
            </form>
        </Modal>
    </>
}

