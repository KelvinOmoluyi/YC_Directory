import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it"
import View from "@/components/View";
import { auth } from "@/auth";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const md = markdownit();

const Page = async ({ params }: 
  {params: Promise<{id? : string}>}) => {

    const session = await auth();
    
    const id = (await params).id;

    const [post, {select: editorPosts }] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, {id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY , { slug: 'editor-picks' })
    ]);

    if (!post) notFound();

    const formattedDate = post._createdAt.toLocaleString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const parsedContent = md.render(post?.pitch || "")

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formattedDate}</p>
                <h1 className="heading text-30-extrabold">{post.title}</h1>
                <p className="sub-heading  !max-w-3xl">
                    {post?.description || "No description available."}
                </p>
            </section>

            <section className="section_container">
                <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl"/>

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={post.author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />
                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article 
                        className="prose max-w-4xl break-all"
                        dangerouslySetInnerHTML={{ __html: parsedContent}}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="divider" />

                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartupCardType, index: number) => (
                                <StartupCard key={index} post={post} />
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <View id={id}/>
        </>
    );
}
 
export default Page;