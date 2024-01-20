'use server'
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";
import { revalidatePath } from "next/cache";
import { updateBalances } from "../payment/balance";
import { checkUserRole } from "../actions";
export async function getLesson(lesson) {

    try {

        const data = await prisma.lesson.findFirst({
            where: {
                lesson_id: lesson
            }
        })
        return data
    }
    catch (err) {
        console.log(err)
    }
    return "Error getting lesson"
}

export async function createLesson(old, formData) {
    const role = await checkUserRole("TEACHER")
    if (!role) return "No permission"

    const data = Object.fromEntries(formData.entries());

    try {
        const lesson = await prisma.lesson.create({
            data: {
                name: data.name,
                description: "",
                grade: 0,
                homework: false,
                given: false,
                course: {
                    connect: {
                        course_id: data.id
                    }
                }
            }
        })
        revalidatePath(`/dashboard/courses/${data.id}`)
        return { close: true, m: "Creating lesson success" }
    }
    catch (err) {
        console.log(err)
        return "Error creating lesson"
    }
}

export async function updateLesson(old, formData) {
    const data = Object.fromEntries(formData.entries());

    const id = data.id
    const isoDate = new Date(data.date).toISOString()
    const course_id = data.course_id
    data.given = data.given === "on" ? true : false

    delete data.date
    delete data.id
    delete data.course_id
    for (let key in data) {
        if (key.startsWith('$')) {
            delete data[key];
        }
    }
    // console.log(data)
    // return "Creating lesson success"


    try {
        const isGiven = await prisma.lesson.findFirst({ where: { lesson_id: id } })

        const lesson = await prisma.lesson.update({
            where: {
                lesson_id: id
            },
            data: {
                ...data, lesson_date: isoDate
            }
        })
        await updateBalances(id, data.given)


        revalidatePath(`/dashboard/courses/${course_id}/${id}`)
        return "Editing lesson success"
    }
    catch (err) {
        console.log(err)
        return "Error updating lesson"
    }
}

export async function lessonComplete(old, formData) {
    const lesson_id = formData.get("lesson_id")
    const course_id = formData.get("course_id")
    var given = formData.get("given") === "on" ? true : false

    const zoom_link = formData.get("zoom_link")
    const date = formData.get("date")



    try {
        //check if given is not already updated

        const lesson = await prisma.lesson.findFirst({
            where: {
                lesson_id: lesson_id
            }
        })
        if (lesson.given && ! await checkUserRole("ADMIN")) given = lesson.given//delete given because only admin can change it

        if (lesson.given !== given) {
            await updateBalances(lesson_id, given)
        }

        await prisma.lesson.update({
            where: {
                lesson_id: lesson_id
            },
            data: {
                given: given,
                zoom_link: zoom_link,
                lesson_date: new Date(date).toISOString()
            }
        })

        revalidatePath(`/dashboard/courses/${course_id}/${lesson_id}`)
        return { error: false, m: "Lesson Data Updated!", ok: true }
    }
    catch (err) {
        console.log(err)
        return { error: true, m: "Error saving lesson information, contact administrator" }
    }
}

export async function lessonTextUpdate(old, formData) {



    const lesson_id = formData.get("lesson_id")
    const course_id = formData.get("course_id")
    const text = formData.get("text")
    const type = formData.get("type")


    if (type !== "description" && type !== "homework_text") {
        console.log("Invalid type")
        return "Error updating lesson text"
    }

    try {
        const lesson = await prisma.lesson.update({
            where: {
                lesson_id: lesson_id
            },
            data: {
                [type]: text
            }
        })
        revalidatePath(`/dashboard/courses/${course_id}/${lesson_id}`)
        return "Lesson text updated"
    }
    catch (err) {
        console.log(err)
        return "Error updating lesson text"
    }
}

export async function lessonDelete(old, formData) {
    const role = await checkUserRole("ADMIN")
    if (!role) return "No permission"
    const lesson_id = formData.get("lesson_id")

    try {
        const lesson = await prisma.lesson.delete({
            where: {
                lesson_id: lesson_id
            }
        })
        revalidatePath(`/dashboard/courses/${lesson.course_id}`)
        return { close: true, m: "Lesson deleted" }
    }
    catch (err) {
        console.log(err)
        return "Error deleting lesson"
    }
}
