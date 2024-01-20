import styles from "./reviews.module.css"
import Image from "next/image"
import light from "@/../public/icons/light.png"

export function Reviews() {
    return <section className={`${styles.back}`}>
        <div className="wrapper py-5 container">

            <h1 className="mb-3">Reviews</h1>
            <ul className={`vstack gap-3 ${styles.reviews}`}>

                <Review image={light} name={"Anonymus"} text={"lorepasdaslkdaslkdjakjdaaaaaaaaaaaaaaaaaaaaalskdjalkjdas"} stars={5} />
                <Review image={light} name={"Anonymus"} text={"lorepasdaslkdaslkdjaslkdjaslkjdalaskdjalkjdas"} stars={5} />
                <Review image={light} name={"Anonymus"} text={"lorepasdaslkdaslkdjaslkdjaslkjdalskdjalkjdsas"} stars={5} />
                <Review image={light} name={"Anonymus"} text={"lorepasdaslkdaslkdjaslkdjaslkjdalskdjalkjdsas"} stars={5} />
                <Review image={light} name={"Anonymus"} text={"lorepasdaslkdaslkdjaslkdjaslkjdalskdjalkjdsas"} stars={5} />
            </ul>
        </div>
    </section>
}

function Review({ image, name, text, stars }) {
    let counter = 0;
    return <li key={"review"+counter++} className={`${styles.review} rounded rounded-4 p-3 hstack gap-3`}>
            <div className="d-flex flex-column align-items-center">
                <Image src={image} />
                <p className="mb-0">{name}</p>
                <p>{"⭐".repeat(stars)}</p>
            </div>
            <span className="vr">
              
            </span>

            <div className="my-2  w-75">
                <p  className={styles.par}>
                    {text}
                </p>
        </div>
    </li>
}
