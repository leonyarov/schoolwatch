'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/global";
import { getServerSession } from "next-auth";
import { config } from "./auth/[...nextauth]/route";

export async function createUser(old, formData) {
    if (! await checkUserRole("ADMIN")) return { e: true, m: "No permission" }


    const user = Object.fromEntries(formData.entries());
    console.log(user);

    const password = Math.random().toString(36).slice(-8).split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c).join('');

    console.log("Password: ", password)

    user.student_age = Number.parseInt(user.student_age)
    user.school_class = Number.parseInt(user.school_class)
    try {
        // throw new Error("Error creating user")

        const data = await prisma.user.create({
            data: {
                ...user,
                creation_date: new Date().toISOString(),
                active: true,
                password: password,
                balance: {
                    create: {
                        amount: 0,
                        currency: "USD"
                    }
                }
            }
        })
        revalidatePath("/dashboard/users");
    }
    catch {
        console.log(err)
        return "Error creating user"
    }

}

export async function getUsers() {
    const data = await prisma.user.findMany()

    return data
}

export async function getUser(id) {
    const data = await prisma.user.findUnique({
        where: {
            user_id: id
        },
        include: {
            balance: true,
        }
    })

    return data
}

export async function getUser_credentials(pass) {

    try {
        const user = await prisma.user.findFirst({
            where: {
                password: pass
            }
        })
        return user
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function updateUser(old, formData) {
    if (! await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());
    data.student_age = Number.parseInt(data.student_age)
    data.school_class = Number.parseInt(data.school_class)
    console.log(data)
    try {

        const user = await prisma.user.update({
            where: {
                user_id: data.user_id
            },
            data: data
        })

        revalidatePath("/dashboard/users");
        return "Success Updating user"

    }
    catch (err) {
        console.log(err)
        return "Error updating user"

    }

}


export async function deleteUser(old, formData) {
    if (! await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const id = formData.get('id')

    try {
        await prisma.user.delete({
            where: {
                user_id: id
            }
        })
        revalidatePath("/dashboard/users");
    }
    catch (err) {
        console.log(err)
        return "Error deleting user"
    }

}


export async function editUser(old, formData) {
    if (! await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const data = Object.fromEntries(formData.entries());
    data.age = Number.parseInt(data.student_age)
    data.class = Number.parseInt(data.school_class)

    try {
        const user = await prisma.user.update({
            where: {
                user_id: data.user_id
            },
            data: {
                email: data.email,
                phone_number: data.phone,
                student_age: data.age,
                school_class: data.class

            }
        })
        revalidatePath("/dashboard/account");
        return "Success Updating user"

    }
    catch (err) {
        console.log(err)
        return "Error updating user"

    }
}


export async function checkUserRole(role) {
    console.log("Checking role: ", role)
    const session = await getServerSession(config)

    if (!session) return false

    if (session.u.role === "ADMIN") return true;

    if (session.u.role !== role) return false

    return true

}
