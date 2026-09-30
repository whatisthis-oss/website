import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  const index = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.id,
    tags: post.data.tags,
    date: post.data.date,
    // Note: To search full body content, we would map `post.body` here,
    // but we'll include a truncated version to keep the index size manageable.
    content: (post.body || '').substring(0, 500)
  }));

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
