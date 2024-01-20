import styles from "./contact.module.css"

export function Contact() {
    return <div className="d-flex justify-content-center flex-column container">
        <form className={`m-2 ${styles.contact}  p-3 shadow`}>
            <h1>Contact Us!</h1>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name of Parent</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="parentName" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Parent Phone</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="parentPhone" />
            </div>
            <div className="mb-5">
                <label htmlFor="exampleInputEmail1" className="form-label">Parent Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name of Child</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="kidName" />
            </div>
            <div className="mb-3 ">
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="age" />
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">className</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="className" />
                    </div>
                </div>
            </div>


            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}