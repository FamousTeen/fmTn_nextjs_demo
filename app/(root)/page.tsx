import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params1 = { search: query || null }

  const session = await auth()

  // console.log(session?.id)

  // pararell query (berguna kalo querynya gk bergantung satu sama lain)
  const [{ data: posts }, { select: editorPosts }] = await Promise.all([
    sanityFetch({ query: STARTUP_QUERY, params: params1 }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
  ])

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto mt-14">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <SanityLive />
    </>
  );
}
