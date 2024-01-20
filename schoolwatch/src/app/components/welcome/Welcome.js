//"use client"
import styles from "./welcome.module.css"
import Image from 'next/image'
import pangolin from '@/../public/pangolin.png'

import brain from '@/../public/icons/brain.png'
import bubble from '@/../public/icons/bubble.png'
import hands from '@/../public/icons/hands.png'
import light from '@/../public/icons/light.png'


export function Welcome() {

    return <section className={styles.back}>
        <div className={`hstack container gap-5 pt-3`}>
            <div className="mt-auto ">

                <Image src={pangolin} width={400} className={styles.pangolin} />

            </div>
            <div className={`vstack align-items-center  justify-content-center g-col-10`}>
                <h1 className={`${styles.text} align-self-start`}>Online language classes for 4-12 years old</h1>

                <div className="grid gap-3 w-100 mt-5">
                    <TextIcon text="Expand Knowledge" icon={brain} />
                    <TextIcon text="Build Confidence" icon={bubble} />
                    <TextIcon text="Make Friends" icon={hands} />
                    <TextIcon text="Have Fun" icon={light} />
                </div>

            </div>
        </div>
    </section>
}

export function TextIcon({ text, icon }) {
    return <div className="d-flex flex-row g-col-6 gap-3">
        <Image src={icon} />
        <p className={styles.text}>{text}</p>
    </div>
}