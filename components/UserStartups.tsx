import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";
import { StartupCardSkeleton } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

    return (
        <>
        {startups ? (
            startups.length > 0 ? (
                startups.map((startup: StartupCardType) => (
                    <StartupCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )
        ) : (
            <StartupCardSkeleton />
        )}
        </>
    );
}
 
export default UserStartups;