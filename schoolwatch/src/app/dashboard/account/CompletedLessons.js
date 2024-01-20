"use client"
import { getCompletedCourses } from '@/app/api/courses/route'
import { Tab, Table, Badge, Form } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import React from 'react'
import { CheckCircle, CheckCircleFill, CheckSquareFill, SlashCircleFill } from 'react-bootstrap-icons';
import { SubmitButton } from '@/app/components/SubmitButton';
import { useFormState } from 'react-dom';
import { applyPaid } from '@/app/api/payment/balance';

export function CompletedLessons({ completed, admin = false }) {
    const router = useRouter();
    const [state, applyPaidAction] = useFormState(applyPaid, "");
    // console.log(completed)

    var courseToColor = {};
    const colors = ["#d7d7ff", "#d7ffd7", "#ffd7d7", "#d7ffff", "#ffd7ff", "#ffffd7"];
    completed.forEach((item, iter) => {
        var course = item.lesson.course;
        if (!courseToColor[course.course_id]) {
            courseToColor[course.course_id] = colors[iter % colors.length];
        }
    });

    return <div className='mt-3'>
        <h2 className='mb-2' >Complete Sessions</h2>

        <Table hover>
            <thead>
                <tr>
                    {/* {admin ?
                        <th className='p-1' style={{ width: "1%" }} ></th> : null
                    } */}
                    <th>Course</th>
                    <th>Lesson</th>
                    <th>At</th>
                    <th>Payed</th>
                </tr>
            </thead>
            <tbody>

                {completed.length > 0 && completed.map((item, iter) => {
                    var lesson = item.lesson
                    var course = item.lesson.course
                    var course_color = courseToColor[course.course_id];

                    // return lesson.lessons?.map((lesson, iter2) => {
                    return <tr key={iter} >
                        {/* {admin ?
                            <Form>
                                <td className='p-1 px-2 text-start' style={{ backgroundColor: course_color }}>
                                    <Form.Text hidden name={"id"} defaultValue={completed.id} />
                                    <SubmitButton text="Apply paid status" variant='warning' />
                                </td>
                            </Form>
                            : <td>dasd</td>
                        } */}
                        <td className='p-1' style={{ backgroundColor: course_color }} onClick={() => router.push(`/dashboard/courses/${course.course_id}`)}>{course.name}</td>
                        <td className='p-1' style={{ backgroundColor: course_color }} onClick={() => router.push(`/dashboard/courses/${course.course_id}/${lesson.lesson_id}`)}>{lesson.name}</td>
                        <td className='p-1' style={{ backgroundColor: course_color }}>{lesson.lesson_date.toLocaleString("he-IL")}</td>
                        <td className='p-1' style={{ backgroundColor: course_color }}>{lesson.payed ? <CheckCircleFill color='green' /> : <SlashCircleFill color='red' />}</td>
                    </tr>
                    // })

                }) || <tr className='text-center fst-italic'><td colSpan={admin ? "5" : "4"}>No completed lessons</td></tr>}
            </tbody>
        </Table>
    </div >

}

