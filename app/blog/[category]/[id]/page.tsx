import { getAllPosts, getAllPostsByCategory, getPostById } from "@/logic/shared/blog-api";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{category: string, id: string}>
}

export async function generateStaticParams(){
  const posts = await getAllPosts();
  return posts.map(post => ({
    category: post.category,
    id: post.id
  }))
}

export async function generateMetaData(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category, id } = await params
    const post = await getPostById(category, id)

    return {
        title: post.title,
        description: post.description,
    }
}

export default async function PostPage({ params }: Props) {
  
  const { category, id } = await params;
  const post = await getPostById(category, id);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      {/* <p>Author: {post.author ?? "Company"}</p> */}
      <p>Published: {post.publishedDate}</p>
      {post.updatedDate && <p>Updated: {post.updatedDate}</p>}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}