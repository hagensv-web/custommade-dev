import PostListing from "@/components/blogs/PostListing";
import { getAllPosts } from "@/logic/shared/blog-api"

export default async function BlogHome(){

    const posts = await getAllPosts();

    return (
    <div>
        <h1>Blogs</h1>

        <h2>Latest Posts</h2>
        { posts.map( post => (
            <PostListing key={post.id} post={post} />
        ))}
    </div>
    )
}