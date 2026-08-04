import PostListing from "@/components/blogs/PostListing";
import StyledLink from "@/components/core/StyledLink";
import { getAllPostsByCategory, getPostById } from "@/logic/shared/blog-api";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{category: string}>
}

export async function generateMetaData(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category } = await params

    return {
        title: category + "Blog",
        description: "",
    }
}

export default async function PostPage({ params }: Props) {
  
  const { category } = await params;
  const posts = await getAllPostsByCategory(category);

  return (
    <div>
        { posts.map( post =>
            <PostListing key={post.id} post={post} />
        ) }
        { !posts && <p>There are no posts in this category, check back later!</p> }
    </div>
   
  );
}