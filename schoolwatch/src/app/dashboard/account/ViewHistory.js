"use client"
import React, { useState } from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
export default function ViewHistory({ data }) {

    const [showModal, setShowModal] = useState(false);
    return <>
        <button className="btn btn-outline-primary ms-auto" onClick={() => setShowModal(true)}>View History</button>

        < Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Purchase History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered hover striped>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Reciept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.payments.map((item, iter) => {
                                return <tr key={iter}>
                                    <td>{item.amount} ₪</td>
                                    <td>{item.date.toLocaleString('he-IL')}</td>
                                    <td className='p-1'><Button variant='secondary' disabled className='p-1 m-0'>Coming Soon</Button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}
