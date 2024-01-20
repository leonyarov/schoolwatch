"use server"
import prisma from "../../../../prisma/global";
import { revalidatePath } from "next/cache";
import { checkUserRole } from "../actions";

export async function updateBalances(lessonId, given) {
    if (given === false && ! await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    // Fetch the lesson, course, and course rates
    const lesson = await prisma.lesson.findUnique({ where: { lesson_id: lessonId } });
    const course = await prisma.course.findUnique({
        where: {
            course_id: lesson.course_id
        },
        include: {
            teacher: {
                include: {
                    balance: true
                }
            }

        }
    });
    const courseRates = await prisma.courseRates.findUnique({ where: { course_id: course.course_id } });

    // Fetch all enrollments for the course
    const students = await prisma.enrollment.findMany({
        where: {
            course_id: course.course_id
        },
        // include: {
        //     student: {
        //         include: {
        //             balance: true
        //         }
        //     }
        // }
        select: {
            student: true
        }
    });

    // console.log(course.teacher)
    if (given) {
        await prisma.completion.create({
            data: {
                user: {
                    connect: {
                        user_id: course.teacher.user_id
                    }
                },
                lesson: {
                    connect: {
                        lesson_id: lessonId
                    }
                },
                tarrif: courseRates.teacher_rate
            }
        })

        students.forEach(async (student) => {
            await prisma.completion.create({
                data: {
                    user: {
                        connect: {
                            user_id: student.student.user_id
                        }
                    },
                    lesson: {
                        connect: {
                            lesson_id: lessonId
                        }
                    },
                    tarrif: courseRates.student_rate
                }
            })
        })
    }
    else {
        await prisma.completion.deleteMany({
            where: {
                lesson_id: lessonId,
                completed: false
            }
        })
    }
}

export async function applyPaid(old, formData) {
    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());
    //data is checkboxes with complettion id
    try {

    }
    catch {

    }

    await prisma.lesson.update({
        where: {
            lesson_id: data.lesson_id
        },
        data: {
            paid: data.paid === "true" ? true : false
        }
    })

    await updateBalances(data.lesson_id, data.paid === "true" ? true : false)

    revalidatePath(`/dashboard/courses/${lesson.course_id}`)
}