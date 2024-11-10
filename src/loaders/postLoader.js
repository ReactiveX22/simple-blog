import { getAllPosts, getPostById } from '../api/postService';

export async function postLoader({ params }) {
  const postId = params.id;

  try {
    const post = await getPostById(postId);
    return { post };
  } catch (error) {
    throw new Response(`Post not found: ${error}`, { status: 404 });
  }
}

export async function allPostLoader() {
  try {
    const allPosts = await getAllPosts();

    return { allPosts: [...allPosts] };
  } catch (error) {
    throw new Response(`Post not found: ${error}`, { status: 404 });
  }
}
