import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"

const page = async () => {
    const session = await auth()
    // redirect if not logged in
    if (!session) redirect('/')

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h3 className="heading">Submit Your Startup</h3>
            </section>

            <StartupForm />
        </>
    )
}

export default page