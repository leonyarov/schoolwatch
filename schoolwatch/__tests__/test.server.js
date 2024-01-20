import { getCourse } from "@/app/api/course/route";

describe("getCourse", () => {
    it("should get a crouse", async () => {
        const data = await getCourse("asdasdasd")
        console.log(data)
    })
})