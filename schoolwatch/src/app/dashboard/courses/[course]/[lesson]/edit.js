"use client"
import { useEffect, useState, useRef, Suspense } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateLesson, lessonTextUpdate, lessonComplete } from '@/app/api/lesson/route';
import styles from "./lesson.module.css"
import { Modal, Button, Alert } from 'react-bootstrap';
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';
import { SubmitButton } from '@/app/components/SubmitButton';
import { DeleteModal } from './DeleteModal';
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


const formName = "editForm"

export function Edit({ data, lesson, admin = false, teacher = false }) {
    const [editLesson, setEditLesson] = useState(false);
    const [reload, setReload] = useState(false);
    //form states
    const [state, updateForm] = useFormState(updateLesson, "")

    const [stateText, updateText] = useFormState(lessonTextUpdate, "")
    const [stateComplete, updateComplete] = useFormState(lessonComplete, "")



    const [homework, setHomework] = useState(data.homework_text);
    const [description, setDescription] = useState(data.description);
    const _homework = useRef("");
    const _description = useRef("");
    const course_id = usePathname().split("/")[3]

    const handleEdit = (s, e, setState) => {
        setState(s)
    }
    useEffect(() => {
        _homework.current.value = homework
        _description.current.value = description
    }, [homework, description])



    return <>

        <div className='mb-2 text-end'>
            <input type="hidden" name="lesson_id" value={lesson} />
            <input type='hidden' name="course_id" value={course_id} />
        </div>

        <div className="hstack align-items-stretch">
            <div className="bg-body-secondary p-3 rounded rounded-3 w-50 ">

                {stateComplete.error ? <Alert variant="danger">{stateComplete.m}</Alert> : <></>}
                {stateComplete.ok ? <Alert variant="success" >{stateComplete.m}</Alert> : <></>}


                <form action={updateComplete}>

                    <input type="hidden" name="lesson_id" value={lesson} />
                    <input type='hidden' name="course_id" value={course_id} />
                    <div className={`row`}>

                        <div className="col-3">
                            <label htmlFor="zoom_link" className="col-form-label">Zoom Link:</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="zoom_link" name='zoom_link' defaultValue={data.zoom_link} className="form-control" readOnly={!teacher && !admin} />
                        </div>
                        <div className="col-auto">
                            <a href={data.zoom_link} className='btn btn-secondary'>↗</a>
                        </div>
                    </div>
                    <div className={`row mt-2`}>

                        <div className="col-3">
                            <label htmlFor="date" className="col-form-label">Date: </label>
                        </div>
                        {/* <div className="col-auto">
                            <input type="date" name="date" className="form-control" defaultValue={data.lesson_date.toLocaleDateString("he-IL")} />
                        </div> */}
                        {/* <div className="col-auto">
                            <input name="time" className="form-control" type='time' defaultValue={data.lesson_date.toLocaleTimeString("he-IL")} />
                        </div> */}
                        <div className="col-auto">
                            <input type="datetime-local" name="date" className="form-control" defaultValue={data.lesson_date.toISOString().slice(0, 16)} readOnly={!teacher && !admin} />
                        </div>
                    </div>
                    {admin || teacher ?
                        <SubmitButton />
                        : <></>
                    }
                    <div className="form-check form-switch row ms-1 mt-2">
                        <input className="form-check-input" defaultChecked={data.given} type="checkbox" role="switch" name="given" id="given" disabled={(data.given && !admin) || !(teacher || admin)} />
                        <div className=''>
                            <label className="form-check-label" htmlFor="given">Lesson Complete</label>
                        </div>
                    </div>

                </form>

            </div>

            {admin ?
                <DeleteModal lesson_id={data.lesson_id} />
                : null
            }

        </div >

        <form className="bg-body-secondary p-3 rounded rounded-3 mt-3 mb-3" action={updateText}>
            <input type="hidden" name="lesson_id" value={lesson} />
            <input type='hidden' name="course_id" value={course_id} />
            <input type='hidden' name="text" ref={_description} />
            <input type="hidden" name="type" value="description" />
            <p>Description </p>
            <MDEditor
                value={description}
                onChange={(s, e) => handleEdit(s, e, setDescription)}
                preview={admin || teacher ? 'live' : "preview"}
                hideToolbar={admin || teacher ? false : true}
            />
            <div className='mt-2 d-flex'>
                {admin || teacher ? <>
                    <p className='fw-light  mb-0' >{description?.length || 0}/1024</p>
                    <SubmitButton className='ms-auto' />
                </>
                    : <></>
                }
            </div>
        </form>

        <form className="bg-body-secondary p-3 rounded rounded-3 mt-3 mb-3" action={updateText}>
            <input type="hidden" name="lesson_id" value={lesson} />
            <input type='hidden' name="course_id" value={course_id} />
            <input type='hidden' name="text" ref={_homework} />
            <input type="hidden" name="type" value="homework_text" />
            <p>Homework</p>
            <MDEditor
                value={homework}
                onChange={(s, e) => handleEdit(s, e, setHomework)}
                preview={admin || teacher ? 'live' : "preview"}
                hideToolbar={admin || teacher ? false : true}
            />
            <div className='mt-2 d-flex'>
                {admin || teacher ? <>
                    <p className='fw-light mb-0' >{homework?.length || 0}/1024</p>
                    <SubmitButton className='ms-auto' />
                </>
                    : <></>
                }
            </div>
        </form>
    </>
}



const BootstrapModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} style={{ width: "90hw" }}>
            <Modal.Header closeButton>
                <Modal.Title>Lesson Homework</Modal.Title>
            </Modal.Header>
            <Modal.Body className='vstack gap-3'>
                <Grade></Grade>
                <Grade></Grade>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

function Grade() {
    return <div className='vstack bg-body-secondary rounded rounded-3 hstack p-3'>
        <div className='vstack'>
            <p>Student: Leon Yarovinski</p>
            <p>Submission Date: 14/05/21</p>
        </div>
        <div className='hstack me-5'>
            <div className="col-2">
                <label htmlFor="grade">Grade:</label>
            </div>
            <div className="col-auto">
                <input type="number" id="grade" className={`form-control`} aria-describedby="" defaultValue={0} />
            </div>
            <Button variant='primary' className='ms-4'>Download</Button>
        </div>
    </div>
}