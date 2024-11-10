import { useLoaderData, useNavigate } from 'react-router-dom';
import { deletePost } from '../api/postService';
import MarkdownRenderer from '../components/markdown/MarkdownRenderer';

export default function PostPage() {
  const { post } = useLoaderData();
  const navigate = useNavigate();

  function handleEdit(postId) {
    navigate(`/posts/${postId}/edit`);
  }
  async function handleDelete(postId) {
    try {
      await deletePost(postId);
      navigate('/posts');
    } catch (error) {
      throw new Error(`Failed to Delete Post: ${postId} \n\n ${error}`);
    }
  }
  return (
    <div className='mx-auto flex w-[744px] flex-col gap-6'>
      <div className='flex justify-between border-b border-zinc-800 pb-4'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold'>{post.title}</h1>
          <h3 className='text-zinc-400'>{post.author}</h3>
        </div>
        <div className='flex h-full gap-6 self-end text-zinc-600'>
          <button
            onClick={() => handleEdit(post.id)}
            className='flex items-center gap-1 transition-all duration-300 hover:text-blue-600'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
              />
            </svg>
            Edit
          </button>
          <button
            onClick={() => handleDelete(post.id)}
            className='flex items-center gap-1 transition-all duration-300 hover:text-red-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
      <div className=''>
        <div className='whitespace-pre-line text-pretty text-justify'>
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </div>
  );
}
