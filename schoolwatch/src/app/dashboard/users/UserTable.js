"use client"
import { ViewUserModal } from "./ViewUserModal"
import { useState } from "react"
import { Badge } from "react-bootstrap";

export function UserTable({ users }) {

    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setViewModal] = useState(false);
    const [userSearch, setUserSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(users)

    const courseCount = (numberOfCourses) => {
        if (numberOfCourses < 3) return "bg-danger"
        if (numberOfCourses >= 5) return "bg-success"
        return "bg-warning"
    }

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setViewModal(true);
    }

    const handleSearch = (e) => {
        setUserSearch(e.target.value)
        if (e.target.value.length === 0) return setFilteredUsers(users)
        setFilteredUsers(users.filter(user => {
            return (
                user.parent_name.toLowerCase().includes(e.target.value.toLowerCase())
                || user.student_name.toLowerCase().includes(e.target.value.toLowerCase())
                || user.email.toLowerCase().includes(e.target.value.toLowerCase())
                || user.phone_number.toLowerCase().includes(e.target.value.toLowerCase())
                || user.school_class.toString().includes(e.target.value.toLowerCase())
                || user.student_age.toString().includes(e.target.value.toLowerCase())
            )
        }))
    }

    return <>
        <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justifty-content-center">
                <input type="text" className="form-control" placeholder="Search" value={userSearch} onChange={handleSearch} />
                {/* search icon */}
                <span className="mx-1">🔎</span>
            </div>
        </div>

        <table className="table table-striped table-hover rounded rounded-2">
            <thead className="rounded-top rounded-3">
                <tr>
                    <th>Role</th>
                    <th>Parent Name</th>
                    <th>Student Name</th>
                    <th>Student Age</th>
                    <th>School Class</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Creation Date</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers?.map((user) => (
                    <tr key={user.user_id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(user)}>
                        <td className="text-center"> <Badge bg={user.role === "TEACHER" ? "warning" : "primary"}>{user.role.toLowerCase()}</Badge></td>
                        <td>{user.parent_name}</td>
                        <td>{user.student_name}</td>
                        <td>{user.student_age}</td>
                        <td>{user.school_class}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.email}</td>
                        <td className="text-end">{user.creation_date.toLocaleString("he-IL", { hour12: false })}</td>
                        <td>
                            <span className={`badge ${user?.active ? 'bg-success' : 'bg-danger'}`}>
                                {user?.active ? 'Yes' : 'No'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ViewUserModal user={selectedUser} show={showViewModal} setShow={setViewModal} />
    </>
}