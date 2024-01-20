"use client"
// import { user_signIn } from "@/app/api/auth/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "../SubmitButton"
import { Alert } from "react-bootstrap"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { InputGroup, FormControl } from "react-bootstrap"

export function LoginModal() {
    const router = useRouter()

    const user_signIn = async (old, formData) => {
        const password = formData.get("password")
        const remember = formData.get("remember")
        signIn("credentials", { password: password, redirect: false })
            .then(result => {
                if (result.status == 401) {
                    setAlert({ error: true, m: "User not found!" })
                }
                if (result.status == 200) {
                    let btn = document.querySelector('.btn-close');
                    let clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });
                    btn.dispatchEvent(clickEvent);
                    router.replace("/dashboard")
                }
            })
    }
    const [formState, setFormState] = useFormState(user_signIn, "")
    const [alert, setAlert] = useState({ error: false, m: "" })
    const [showPassword, setShowPassword] = useState(false)

    return <div className="modal fade" id="loginModal" tabIndex="-1"  >
        <div className="modal-dialog">
            <div className="modal-content">
                <form action={setFormState}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginLabel">Sign In</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputPassword1">Password  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} ms-2`} onClick={() => setShowPassword(prev => !prev)}></i></label>
                            <input type={showPassword ? "text" : "password"} className="form-control " id="exampleInputPassword1" name="password" placeholder="Password" />

                        </div>
                        <div className="form-group form-check mb-3">
                            <input type="checkbox" className="form-check-input" name="remember" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Remeber me?</label>
                        </div>
                        {alert.error && <Alert variant="danger" dismissible onClose={() => setAlert(false)}>
                            {alert.m}
                        </Alert>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <SubmitButton text="Login" />
                    </div>
                </form>
            </div>
        </div>
    </div >
}

