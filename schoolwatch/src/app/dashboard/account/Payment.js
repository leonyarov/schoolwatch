"use client"

import { BuyMore } from "./BuyMore"
import ViewHistory from "./ViewHistory"

export function Payment({ completed, user }) {
    const dept = completed.reduce((acc, cur) => acc + cur.tarrif, 0)
    const paid = user.payments.reduce((acc, cur) => acc + cur.amount, 0)
    const total = paid - dept
    return <div className="mt-5">
        <h2>Payment</h2>
        <div className="rounded rounded-3 bg-body-secondary p-3 hstack gap-3">
            <div className="rounded rounded-3 bg-light p-2">
                <p className="mb-0">
                    Balance left: {total}
                </p>
            </div>
            {/* <div className="rounded rounded-3 bg-light p-2">
                <p className="mb-0">
                    10 total paid
                </p>
            </div> */}

            {/* <button className="btn btn-outline-primary ms-auto">View History</button> */}
            <ViewHistory data={user} />
            {/* <button className="btn btn-success ">Buy More</button> */}
            <BuyMore data={user} />

        </div>
    </div>
}