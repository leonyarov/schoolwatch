"use client"
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "../../api/actions.js";
import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { SubmitButton } from "@/app/components/SubmitButton.js";


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



    return <>
        <button className="btn btn-primary" onClick={() => setShow(true)}>New User</button>

        {state && <Alert variant="danger" className="text-start my-2" >
            {state}
        </Alert>}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
            </Modal.Header>
            <form id="new_user" action={formActions}>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <SubmitButton text="Add New" />
                </Modal.Footer>
            </form>
        </Modal >
    </>
}


