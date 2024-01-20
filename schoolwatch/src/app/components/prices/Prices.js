import styles from "./prices.module.css"
export function Prices() {
    return <section className={styles.back}>
        <div className="wrapper py-5 container">

            <h1 id="prices" className={`${styles.text}  p-1 mb-5`} >Prices</h1>

            <div className="d-flex flex-lg-row flex-column gap-2">
                <Price lessons={8} price={35} />
                <Price lessons={16} price={32} />
                <Price lessons={24} price={30} />
            </div>

        </div>

    </section>

}

function Price({ lessons, price }) {
    return <div className={`${styles.price}  p-3 vstack`}>
        <h2 className={`${styles.text} text-center`}>{lessons} Lessons</h2>
        <div className={`${styles.text} p-3 ${styles.total} text-center lead`}>
        <span>{price} ₪ per lesson</span> <span className="vr"></span> <span>{price * lessons} ₪ total</span>
        </div>
    </div>
}