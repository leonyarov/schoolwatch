"use server"
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";
import { revalidatePath } from "next/cache";
import { checkUserRole } from "../actions";

export async function getCourses() {

    const courses = await prisma.course.findMany({
        include: {
            teacher: true,
            rates: true,
        }
    })
    const enrollment = await prisma.enrollment.findMany({
        include: {
            student: true,
        }
    })

    const combined = courses.map(course => {
        const students = enrollment.filter(enrollment => enrollment.course_id === course.course_id).map(enrollment => enrollment.student.student_name)
        return { ...course, students }
    })

    // revalidatePath('/dashboard/courses')
    return combined
}
export async function getCourses_teacher(user_id) {

    // const user = await prisma.user.findUnique({
    //     where: {
    //         user_id
    //     }
    // })

    const courses = await prisma.course.findMany({
        include: {
            teacher: true,
            // rates: true,
        },
        where: {
            teacher_name: user_id
        }
    })

    const enrollment = await prisma.enrollment.findMany({
        include: {
            student: true,
        }
    })

    const combined = courses.map(course => {
        const students = enrollment.filter(enrollment => enrollment.course_id === course.course_id).map(enrollment => enrollment.student.student_name)
        return { ...course, students }
    })
    return combined

}

export async function getCourses_students(student_id) {

    // const user = await prisma.user.findUnique({
    //     where: {
    //         user_id
    //     }
    // })


    const enrollment = await prisma.enrollment.findMany({
        where: {
            student_id: student_id
        },
        include: {
            student: true,
            course: {
                include: {
                    teacher: true,
                }
            },
        }
    })

    // console.log(enrollment)

    const courses = enrollment.map(enrollment => enrollment.course)

    const combined = courses.map(course => {
        const students = enrollment.filter(enrollment => enrollment.course_id === course.course_id).map(enrollment => enrollment.student.student_name)
        return { ...course, students }
    })
    return combined

}

export async function getCourse(id) {

    const course = await prisma.course.findUnique({
        where: {
            course_id: id
        },
        include: {
            teacher: true,
        }
    })

    return course

}

export async function createCourse(old, formData) {

    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());
    data.teacher_rate = parseFloat(data.teacher_rate)
    data.student_rate = parseFloat(data.student_rate)


    try {

        await prisma.course.create({
            data: {
                name: data.name,
                rates: {
                    create: {
                        teacher_rate: data.teacher_rate,
                        student_rate: data.student_rate,
                    }
                },
                teacher: {
                    connect: {
                        user_id: "admin"
                    }

                }
            }
        })

        revalidatePath('/dashboard/courses')
    }
    catch (err) {
        console.log(err)
        return "Error creating course"
    }

    return { close: true, m: "Create course sucess" }
}

export async function deleteCourse(formData) {

    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());

    try {

        await prisma.CourseRates.deleteMany({
            where: {
                course_id: data.course_id
            }
        })

        await prisma.enrollment.deleteMany({
            where: {
                course_id: data.course_id
            }
        })


        await prisma.lesson.deleteMany({
            where: {
                course_id: data.course_id
            },
        })

        await prisma.course.delete({
            where: {
                course_id: data.course_id
            }
        })



        await prisma.lesson.deleteMany({
            where: {
                course_id: data.course_id
            }
        })



        revalidatePath('/dashboard/courses')
    }
    catch (err) {
        console.log(err)
        return "Error deleting course"
    }

    return { close: true, m: "Delete course sucess" }
}

export async function getCompletedCourses(user_id) {
    // if (!await checkUserRole("TEACHER")) {
    const courses = await prisma.completion.findMany({
        where: {
            user_id: user_id
        },
        include: {
            lesson: {
                include: {
                    course: true
                }
            },

        },

    })

    return courses
    // }

    // const courses = await prisma.completion.findMany({
    //     where: {
    //         lesson: {
    //             course: {
    //                 teacher_name: user_id
    //             }

    //         },
    //         user_id: user_id
    //     },
    //     include: {
    //         lesson: {
    //             include: {
    //                 course: true
    //             }
    //         },

    //     },

    // })


    return courses
}