import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const postsDirectory = path.join(process.cwd(), 'blog-posts');

export interface BlogPostDetails {
  id: string,
  title: string,
  category: string,
  description: string,
  publishedDate: string,
  updatedDate?: string,
  url: string
}

interface BlogPost extends BlogPostDetails {
  html: string
}

const sortByDate = (a: BlogPostDetails, b: BlogPostDetails) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()

export async function getPostCategories(){
    const categories = fs.readdirSync(postsDirectory);
    return categories
}

export async function getAllPosts() {  
    const posts = await Promise.all((await getPostCategories()).map( async category => await getAllPostsByCategory(category) ))
    
    return posts.flat().sort(sortByDate)
}

export async function getAllPostsByCategory(category: string): Promise<BlogPostDetails[]> {
  const fileNames = fs.readdirSync(path.join(postsDirectory,category));
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory,category,fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        id,
        title: data.title,
        category: category,
        description: data.description,
        publishedDate: data.publishedDate,
        updatedDate: data.updatedDate,
        url: `/blog/${category}/${id}`
      };
    })
  );
  return posts.sort(sortByDate);
}

export async function getPostById(category: string, id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, category, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { })
    .use(rehypeStringify)
    .process(content);

  return {
    id,
    title: data.title,
    category: category,
    description: data.description,
    publishedDate: data.publishedDate,
    updatedDate: data.updatedDate,
    url: `/blog/${category}/${id}`,
    html: html.toString(),
  };
}   