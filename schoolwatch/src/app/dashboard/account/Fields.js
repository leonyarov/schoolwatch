"use client"
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editUser } from '@/app/api/actions';
import { Image } from 'next/image'
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';


export function Fields({ user, image }) {
    const [isFieldDisabled, setIsFieldDisabled] = useState(true);
    const [state, editForm] = useFormState(editUser, "");
    const handleButtonClick = () => {
        // Update the state to enable the field
        setIsFieldDisabled(!isFieldDisabled);
    };
    // console.log(image.data.publicUrl)
    return <>

        <form className={`rounded rounded-3 bg-body-secondary p-3 `} action={editForm}>
            <input type="hidden" name="user_id" defaultValue={user?.user_id} />
            <DetailField label="Name" value={user.parent_name} type="text" disabled={true} />
            <DetailField label="Email" value={user.email} type="email" />
            <DetailField label="Phone" value={user.phone_number} type="text" />
            <DetailField label="Age" value={user.student_age} type="number" />
            <DetailField label="Class" value={user.school_class} type="number" />
            <Avatar image={image.data.publicUrl} user_id={user.user_id} />
            <div className='text-end mt-2'>
                <button type='reset' className='btn btn-secondary me-2'>Reset</button>
                <button className="btn btn-primary ms-auto" type='submit'>Save</button>
            </div>
        </form>
    </>
}

const Avatar = ({ image, user_id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePath, setImagePath] = useState(image);
    const [error, setError] = useState(null);
    const router = useRouter()
    const name = 'public/' + user_id + ".png"

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if (file.size > maxSize) {
            alert('File size exceeds 5MB. Please select a smaller file.');
            return;
        }
        try {
            const { data, error } = await supabase.storage
                .from('media')
                .upload(name, file, { upsert: true })
            console.log('File uploaded successfully: ', data.publicUrl);
            if (error) throw error;
        } catch (err) {
            console.error('Error uploading file: ', err);
        }
    };

    return (
        <div className="">
            <div className="form-group row mb-2">
                <div className="col-3">
                    <label htmlFor="avatarInput">Avatar</label>
                </div>
                <div className="col-auto">
                    <input
                        type="file"
                        className="form-control-file"
                        id="avatarInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>


            <div className="form-group row">
                <div className="col-3">
                    <label>Preview</label>
                </div>
                <div className="col-auto">
                    <img src={imagePath} alt="Avatar Preview" className="img-thumbnail" width="100px" />
                </div>
            </div>
        </div>
    );
};

function DetailField({ label, type, value, disabled = false }) {
    const id = label + "Input"
    return <div className="row g-3 align-items-center mb-2">
        <div className="col-3">
            <label htmlFor={id}>{label}</label>
        </div>
        <div className="col-auto">
            <input type={type} id={id} className={`form-control`} name={label} defaultValue={value} disabled={disabled} />
        </div>
    </div>
}