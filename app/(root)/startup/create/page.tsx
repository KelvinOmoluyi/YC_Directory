import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth();

    if (!session) redirect("/");

    return (
        <>
            <section className="pink_container">
                <h1 className="heading text-30-extrabold">Submit your Statuup</h1>
            </section>

            <StartupForm />
        </>
    );
}
 
export default Page;