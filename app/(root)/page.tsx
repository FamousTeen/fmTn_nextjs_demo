import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = [{ 
    _createdAt: new Date(),
    views: 55,
    author: {_id: 1, name: "FmTn"},
    _id: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper lacinia dolor, ac iaculis diam consequat vitae. Quisque vitae hendrerit purus. Aliquam ut tortor nulla. Proin vel neque egestas, commodo augue a, mattis velit. Donec est augue, mollis quis sollicitudin non, interdum a odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed pellentesque lacus. Nulla facilisi. Vestibulum posuere nibh turpis, vel tincidunt eros maximus non. Quisque tempus sit amet felis in sollicitudin. Fusce quis dapibus dolor, eu tristique purus. Phasellus vehicula at nunc ac tempus. Donec quis ipsum eget dui rutrum dapibus. Curabitur commodo orci nisi, nec semper enim euismod in.",
    image: "https://st2.depositphotos.com/3591429/5246/i/450/depositphotos_52463953-stock-photo-people-working-with-startup.jpg",
    category: "Robots",
    title: "We Robots",
  }]
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
          ): (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
