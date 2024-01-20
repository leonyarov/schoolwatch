import { Payment } from "./payment"
import { getUser } from "@/app/api/actions"
import { getCompletedCourses } from "@/app/api/courses/route"
import { getPayments } from "@/app/api/payment/action"

export default async function Page({ params }) {

    const id = params.user
    const user = await getPayments(id)
    const completed = await getCompletedCourses(id)

    return <section>
        <Payment user={user} completed={completed} />
    </section>
}
