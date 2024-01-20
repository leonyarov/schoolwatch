"use client"
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GoBack } from '@/app/components/GoBack';
import { useSearchParams } from 'next/navigation';
import { useFormState } from "react-dom"
import { newPayment, deletePayment } from "@/app/api/payment/action"
import { SubmitButton } from '@/app/components/SubmitButton';
import { CompletedLessons } from '@/app/dashboard/account/CompletedLessons';
export function Payment({ user, completed }) {

    const defaultPayment = {
        amount: 0.0,
        currency: 'USD',
        date: new Date()
    }

    const [uploadState, uploadPayment] = useFormState(newPayment, "")
    const [deleteState, delPayment] = useFormState(deletePayment, undefined)

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false)
    }

    useState(() => {
        // console.log("asdaskldjaslkdjaslkdjaslkjd")
        if (uploadState.close)
            setShowModal(false)
    }, [uploadState])


    const math = user.payments?.reduce((acc, cur) => acc + cur.amount, 0)
    const debt = completed?.reduce((acc, cur) => acc + cur.tarrif, 0)

    return <>
        <GoBack />
        <h1>Payment</h1>
        <h2>User: {user.parent_name}</h2>
        <div className='d-flex align-items-center'>
            <h3 className='mt-2'  >Balance: <span className='fw-normal'>{math - debt || "NaN"}</span> ILS</h3>

            <div className='ms-auto'>
                <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add Payment</button>
            </div>
        </div>

        <table className='table table-striped table-hover rounded rounded-2 mt-3'>
            <thead>
                <tr>
                    <th>Payment ID</th>
                    {/* <th>Payer ID</th> */}
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Date</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {user?.payments.map((payment) => (
                    <tr key={payment.payment_id}>
                        <td>{payment.payment_id}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.currency}</td>
                        <td>{payment.date.toLocaleString("he-IL")}</td>
                        <td className='p-1'>
                            <form action={delPayment}>
                                <input type='hidden' name='payment_id' value={payment.payment_id} />
                                <input type='hidden' name='user_id' value={user.user_id} />
                                <SubmitButton variant='danger' text='Delete' className='p-1 m-0' />
                            </form>
                        </td>
                    </tr>
                ))}
                {
                    user?.payments.length === 0 ? <tr>
                        <td colSpan={5} className='text-center fst-italic'>No Payment History</td>
                    </tr>
                        : <tr>
                            <td colSpan={5} className='text-center fst-italic'>Total: {math} ILS</td>
                        </tr>
                }
            </tbody>
        </table>

        <div className='mt-5'>
            <hr></hr>
            <CompletedLessons completed={completed} admin={true} />
        </div>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Payment</Modal.Title>
            </Modal.Header>
            <form action={uploadPayment} id="new_payment">
                <Modal.Body>

                    <input type='hidden' name='user_id' value={user.user_id} />
                    <div className='form-group'>
                        <label htmlFor='amount'>Amount</label>
                        <input type='number' step={.01} className='form-control' id='amount' name='amount' placeholder='0' autoFocus required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='currency'>Currency</label>
                        <input type='text' className='form-control' id='currency' name='currency' defaultValue={"ILS"} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='date'>Date</label>
                        <input type='date' className='form-control' id='date' name='date' defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <SubmitButton text='Add' />
                </Modal.Footer>
            </form>
        </Modal>
    </>
}

