"use client"
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return <div className='d-flex align-items-center justify-content-center w-100 h-100'>
    <Spinner animation="border" variant="primary" />
  </div>
}

