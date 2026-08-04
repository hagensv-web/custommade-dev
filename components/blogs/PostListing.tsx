import { BlogPostDetails } from "@/logic/shared/blog-api";
import StyledLink from "../core/StyledLink";

const toTitleCase = (str: string) => 
  str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

export default function PostListing({ post }: { post: BlogPostDetails }){
    return (
        <div>
            <h2><StyledLink href={post.url}>{post.title}</StyledLink></h2>
            <p>In {toTitleCase(post.category)}, Published {post.publishedDate}</p>
            <p>{post.description}</p>
        </div>
    )
}