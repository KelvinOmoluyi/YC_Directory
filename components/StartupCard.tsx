import { EyeIcon } from "lucide-react";
import { formatDate } from "../functions";
import Link from "next/link";
import Image from "next/image";
import { Startup, Author } from "@/sanity/types";
import Skeleton from "react-loading-skeleton";
import { urlFor } from "@/sanity/lib/image";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({post}: {post: StartupCardType}) => {
    const { _createdAt, views, author, _id, description, image, category, title} = post;

    return (
        <li key={post._id} className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>

                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}/`}>
                        <p className="text-16-medium line-clamp-1">
                            {author?.name || "Anonymous"}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>

                <Link href={`/user/${author?._id}/`}>
                    <Image src={author?.image ? urlFor(author.image) : "https://placehold.co/48x48"}
                    alt={author?.name || ""} 
                    width={48}
                    height={48}
                    className="rounded-full"/>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>

                <Image src={image || "/images/place-holder.png"}  alt="Startup image" className="startup-card_img"/>
                {/* <img src={}/> */}
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">
                        {category}
                    </p>
                </Link>

                <button className="StartupCard_btn">
                    <Link href={`/startup/${_id}`}>
                        Read more
                    </Link>
                </button>
            </div>
        </li>
    );
}

export const StartupCardSkeleton = () => (
    <>
    {[0, 1, 2, 3].map((index: number) => (
        <li key={index}>
            <Skeleton className="startup-card_skeleton" />
        </li>
    ))}
    </>
)
 
export default StartupCard;