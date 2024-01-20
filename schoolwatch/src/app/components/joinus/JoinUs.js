import styles from "./joinus.module.css"

export function JoinUs() {
    return <section className={`${styles.join} text-center py-4`}>
        <button className="btn btn-primary px-5 py-2 shadow">Join Today!</button>
    </section>
}