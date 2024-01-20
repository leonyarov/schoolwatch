"use client"
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "../../api/actions.js";
import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";


export function NewUserModal() {
    const [show, setShow] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [state, formActions] = useFormState(createUser, "")

    const UserField = ({ name, label, type = 'text' }) => {
        return <>
            <div className="mb-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <input type={type} className="form-control" id={name + "2"} name={name} />
            </div>
        </>
    }

    function handleClose() {
        setShow(false);
    }

    function handleError() {
        setShowErr(false);
        state.show = false
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const form = new FormData(event.target);
    //     const data = Object.fromEntries(form.entries());
    //     console.log(data);
    //     fetch('/api/users', {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setReload(prev => !prev)
    //             handleClose()
    //             console.log(data)
    //         });
    // }

    return <>
        <button className="btn btn-primary" onClick={() => setShow(true)}>New User</button>

        {state && <Alert variant="danger" className="text-start my-2" >
            {state}
        </Alert>}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="new_user" action={formActions}>
                    <UserField name="parent_name" label="Parent Name" type="text" />
                    <UserField name="student_name" label="Student Name" />
                    <UserField name="student_age" label="Student Age" type="number" />
                    <UserField name="school_class" label="School Class" type="number" />
                    <UserField name="phone_number" label="Phone Number" />
                    <UserField name="email" label="Email" />

                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" id="role" name="role">
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <SubmitButton />
            </Modal.Footer>
        </Modal>
    </>
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button variant="primary" type="submit" form="new_user" disabled={pending}>
        Submit
    </Button>
}
