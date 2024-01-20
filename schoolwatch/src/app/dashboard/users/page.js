import { Loading } from "@/app/components/loading/Loading";
import prisma from '../../../../prisma/global';
import { UserTable } from "./UserTable";
import { getUsers } from "@/app/api/actions";
import { NewUserModal } from "./NewUserModal";

export default async function Users({ searchParams }) {

    const showNewUserModal = searchParams?.showNewUserModal

    const users = await getUsers()
    // console.log(users)

    return (
        <section className="mt-4">
            <h2>Users Table</h2>
            <div className="w-100 text-end my-1">
                <NewUserModal />
            </div>
            <UserTable users={users} />
        </section>
    );
}






