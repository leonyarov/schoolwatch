import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const course = searchParams.get('course')

    try {
        const data = await prisma.calendar.findFirst({
            where: {
                user_id: id,
                course_id: course
            }
        })
        return NextResponse.json(data)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json("Error fetching user")
    }
}