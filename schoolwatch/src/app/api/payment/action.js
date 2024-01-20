"use server"
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/global";
import { revalidatePath } from "next/cache";
import { checkUserRole } from "../actions";

export async function getPayments(user) {
    // if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    try {
        const data = await prisma.user.findFirst({
            where: {
                user_id: user
            },
            include: {
                payments: true,
            }
        })

        
        return data
    }
    catch (err) {
        console.log(err)
        return "Error getting payments"
    }
}

export async function newPayment(old, formData) {
    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }
    const data = Object.fromEntries(formData.entries());

    data.date = new Date(data.date).toISOString()

    data.amount = parseFloat(data.amount)

    try {
        const user = await prisma.payment.create({
            data: {
                user: {
                    connect: {
                        user_id: data.user_id
                    }
                },
                amount: data.amount,
                currency: data.currency,
                date: data.date
            }
        })
        revalidatePath(`/dashboard/users/${data.user_id}/payment`)
        return { close: true, m: "New payment created" }
    }
    catch (err) {
        console.log(err)
        return "Error creating payment"
    }
}

export async function deletePayment(old, formData) {
    if (!await checkUserRole("ADMIN")) return { e: true, m: "No permission" }

    const id = formData.get("payment_id")
    const user_id = formData.get("user_id")
    try {
        const user = await prisma.payment.delete({
            where: {
                payment_id: id
            }
        })
        revalidatePath(`/dashboard/users/${user_id}/payment`)
        return "Payment deleted"
    }
    catch (err) {
        console.log(err)
        return "Error deleting payment"
    }
}
