"use client"
import { useFormStatus } from "react-dom"
import { Button } from "react-bootstrap"
export function SubmitButton({ variant = "primary", className = 'float-end', text = "Save" }) {
    const { pending } = useFormStatus()
    return <Button className={className} variant={variant} type="submit" disabled={pending} >{
        pending ?
            <div className="spinner-border spinner-border-sm" role="status" >
                <span className="visually-hidden">Loading...</span>
            </div> : text
    }
    </Button>
}