import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

interface postType {
  _id: number;
  _createdAt: string;
  views: number;
  author: { _id: number; name: string; image: string };
  description: string;
  image: string;
  category: string;
  title: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  // const posts = await client.fetch(STARTUP_QUERY);

  const params = { search: query || null };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth();

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  // const tempPosts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Venkat" },
  //     _id: 1,
  //     description: "This is description of the starup We robots",
  //     image:
  //       "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your StartUp, <br />
          Connect with Entrepeneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competetions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 max-sm:grid-cols-1 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: postType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Results found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
