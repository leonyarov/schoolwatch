import { Fields } from "./Fields";
import { supabase } from "@/lib/supabase";
import { Payment } from "./Payment";
import { getPayments } from "@/app/api/payment/action";
import { config } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { CompletedLessons } from "./CompletedLessons";
import { getCompletedCourses } from "@/app/api/courses/route";
export default async function Account() {

    const session = await getServerSession(config)
    const user = await getPayments(session.u.user_id)
    const completed = await getCompletedCourses(session.u.user_id)

    // console.log(user)
    const url = await supabase.storage.from('media').getPublicUrl(`public/${session.u.user_id}.png`);
    // console.log(url);

    return <section>
        <h1>Account</h1>
        <div className="hstack mb-2">
            <h2>General</h2>
        </div>

        <Fields user={session.u} image={url} />
        {session.u.role === "STUDENT" ?
            <Payment completed={completed} user={user} />
            : <CompletedLessons completed={completed} />
        }
    </section>
}





