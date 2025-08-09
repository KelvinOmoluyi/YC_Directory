import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";

import { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: 
  {searchParams: Promise<{query? : string}>}) {
    const query = (await searchParams).query;
    const params = {search: query || null};

    const session = await auth()

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERIES, params});

    // console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading text-30-extrabold">Pitch Your Startup, <br /> Connect With Entreprenuers</h1>

        <p className="sub-heading  !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed In Virtual Comptitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-30-bold">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
