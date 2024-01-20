"use client"
import React, { useState } from 'react'
import { Modal, Button, Card, Badge } from 'react-bootstrap'

export function BuyMore({ data }) {
    const [showModal, setShowModal] = useState(false)

    return <>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Buy More</button>

        < Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Package</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex gap-3 justify-content-center'>

                <PriceCard title="10 Lesson Pack" price="10" >
                    Best Price ever dude lmao
                </PriceCard>
                <PriceCard title="10 Lesson Pack" price="30" >
                    Best Price ever dude lmao
                </PriceCard> <PriceCard title="10 Lesson Pack" price="25" >
                    <ul>
                        <li>
                            Best
                        </li>
                        <li>
                            Free Zoom
                        </li>
                    </ul>
                </PriceCard>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    </>
}

function PriceCard(props) {
    return <Card style={{ width: '18rem' }} className='shadow' >
        <Card.Body className='d-flex flex-column'>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Price:
                <Badge className='mx-1' bg='dark'>
                    {props.price} NIS
                </Badge>
            </Card.Subtitle>
            <Card.Text>
                {props.children}
            </Card.Text>
            <Button variant="primary ms-auto mt-auto">Buy</Button>
        </Card.Body>
    </Card>
}


