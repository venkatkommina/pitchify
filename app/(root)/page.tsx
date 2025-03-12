import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const tempPosts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Venkat" },
      _id: 1,
      description: "This is description of the starup We robots",
      image:
        "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Robots",
      title: "We Robots",
    },
  ];
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
          {tempPosts?.length > 0 ? (
            tempPosts.map((post) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No Results found</p>
          )}
        </ul>
      </section>
    </>
  );
}
