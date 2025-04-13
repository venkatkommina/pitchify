import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import markdownit from "markdown-it";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { auth } from "@/auth";
import { deleteStartup } from "@/lib/actions";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPicks }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post.pitch || "");

  const session = await auth();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex flex-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center gap-2"
            >
              <Image
                src={post.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          {session?.id === post.author?._id && (
            <form
              action={async () => {
                "use server";
                await deleteStartup(post._id);
                redirect(`/user/${session.id}`);
              }}
            >
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Startup
              </button>
            </form>
          )}

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work0sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-tesult">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPicks?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPicks.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
