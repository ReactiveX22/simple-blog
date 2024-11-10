import { getUserById } from './userService';

import config from './config.json';

const postURL = config.baseURL + 'posts/';

export async function getPostById(postId) {
  const response = await fetch(postURL + postId);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const postData = await response.json();
  const author = await getUserById(postData.author);

  const post = {
    ...postData,
    author: author.name,
  };

  return post;
}

export async function getAllPosts() {
  const response = await fetch(postURL);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const allPostData = await response.json();

  const allPosts = await Promise.all(
    allPostData.map(async (postData) => {
      const author = await getUserById(postData.author);
      return { ...postData, author: author.name };
    }),
  );

  return allPosts;
}

export async function createPost(data) {
  const response = await fetch(postURL, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      id: generateId(),
      title: data.title,
      content: data.content,
      author: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

export async function updatePost(data) {
  const response = await fetch(postURL + data.id, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      title: data.title,
      content: data.content,
      author: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  return response.json();
}

// helpers
function generateId() {
  return crypto.randomUUID();
}

export async function deletePost(postId) {
  const response = await fetch(postURL + postId, {
    method: 'DELETE',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  return response.json();
}
