import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";

import { revalidatePath } from "next/cache";

// export async function GET(request) {

//     const data = await prisma.user.findMany()

//     return NextResponse.json(data)
// }

// export async function POST(request) {
//     // console.log("Request body: ", request.json())

//     const data = await request.json()
//     console.log("Request body: ", data)
//     const password = Math.random().toString(36).slice(-8).split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c).join('');
//     console.log("Password: ", password)
//     var student_age = Number.parseInt(data.student_age)
//     var school_class = Number.parseInt(data.school_class)
//     try {
//         const user = await prisma.user.create({
//             data: {
//                 parent_name: data.parent_name,
//                 email: data.email,
//                 phone_number: data.phone_number,
//                 student_name: data.student_name,
//                 student_age: student_age,
//                 school_class: school_class,
//                 role: data.role,
//                 password: password
//             }
//         })
//         return NextResponse.json(user)
//     }
//     catch (err) {
//         console.log(err)
//         return NextResponse.json(err)
//     }
// }

// export async function DELETE(request) {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('id')

//     try {
//         await prisma.user.delete({
//             where: {
//                 user_id: id
//             }
//         })
//     }
//     catch (err) {
//         console.log(err)
//         return NextResponse.json("Error deleting user")
//     }

//     return NextResponse.json("User Deleted")
// }

// export async function PUT(request) {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('id')
//     const data = await request.json()

//     data.student_age = Number.parseInt(data.student_age)
//     data.school_class = Number.parseInt(data.school_class)
//     console.log("Data: ", data)
//     try {
//         const user = await prisma.user.update({
//             where: {
//                 user_id: id
//             },
//             data: data
//         })
//         revalidatePath("/dashboard/users");
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
