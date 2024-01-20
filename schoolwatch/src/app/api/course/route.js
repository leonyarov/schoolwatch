// import { PrismaClient } from "@prisma/client";
"use server"
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";
import { revalidatePath } from "next/cache";
import { checkUserRole } from "../actions";

export async function getCourse(id) {

    const course = await prisma.course.findFirst({
        where: {
            course_id: id
        },
        include:
        {
            lessons: true,
            exams: true
        }
    })

    const students = await prisma.enrollment.findMany({
        where: {
            course_id: id
        },
        include: {
            student: true
        }
    })

    const teacher = await prisma.user.findFirst({
        where: {
            user_id: course.teacher_name
        }
    })

    return { ...course, students, teacher }
}


export async function updateCourse(old, formData) {

    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());

    const teacher = data.teacher_select
    const students = Object.keys(data).filter(key => data[key] === "on");
    const course_id = data.course_id
    // console.log(teacher, students)
    // return "lol"
    try {
        await prisma.course.update({
            where: {
                course_id: course_id
            },
            data: {
                teacher: {
                    connect: {
                        user_id: teacher
                    }
                },
            }
        })

        await prisma.enrollment.deleteMany({
            where: {
                course_id: course_id
            },
        });

        students.forEach(async element => {
            console.log(element)
            await prisma.enrollment.create({
                data: {
                    student: {
                        connect: {
                            user_id: element
                        }
                    },
                    course: {
                        connect: {
                            course_id: course_id
                        }
                    }
                }
            })

        });
    }
    catch (err) {
        console.log(err)
        return "Updating course failed"
    }
    // revalidatePath("/dashboard/courses/" + course_id)
    revalidatePath(`/dashboard/courses/${course_id}`)
    return { close: true, m: "Update successful" }
}


