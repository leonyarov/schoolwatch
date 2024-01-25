"use client"
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deleteUser, updateUser } from "@/app/api/actions";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "@/app/components/SubmitButton";

// import { createUser } from "@/app/api/actions";

export function ViewUserModal({ user, show, setShow }) {


    const [deleteState, formDelete] = useFormState(deleteUser, "")
    const [updateState, formUpdate] = useFormState(updateUser, "")

    function handleClose() {
        setShow(false);
    }


    const UserField = ({ name, label, type = 'text' }) => {
        return <div className="mb-3">
            <label htmlFor={name} className="form-label fw-bold">{label}</label>
            <input type={type} className="form-control" id={name} name={name} defaultValue={user[name]} />
        </div>
    }

    return (<>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="user_edit" action={formUpdate}>
                    <input type="hidden" name="user_id" defaultValue={user?.user_id} />
                    <UserField name="parent_name" label="Parent Name" type="text" />
                    <UserField name="student_name" label="Student Name" />
                    <UserField name="student_age" label="Student Age" type="number" />
                    <UserField name="school_class" label="School Class" type="number" />
                    <UserField name="phone_number" label="Phone Number" />
                    <UserField name="email" label="Email" />
                    <UserField name="password" label="Password"/>

                    <p className={`badge ${user?.active ? 'bg-success' : 'bg-danger'}`}>
                        {user?.active ? 'Active' : 'Inactive'}
                    </p>
                    <SubmitLoad handleClose={handleClose} />
                </form>
                <Button variant="primary" href={`/dashboard/users/${user?.user_id}/payment`}>
                    View Payments
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <form action={formDelete}>
                    <input type="hidden" name="id" value={user?.user_id} />
                    {/* <Button variant="danger" type="submit" onClick={handleClose}>
                        Delete
                    </Button> */}

                    <SubmitButton variant="danger" text="Delete" />
                </form>

                <Button variant="success" type="submit" form="user_edit" >
                    Save Changes
                </Button>

            </Modal.Footer>
        </Modal>
    </>
    );
};

function SubmitLoad({ handleClose }) {
    const { pending } = useFormStatus()

    useEffect(() => {
        if (pending) {
            handleClose()
        }
    }, [pending]);

    return pending ? <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
    </div> : null

}