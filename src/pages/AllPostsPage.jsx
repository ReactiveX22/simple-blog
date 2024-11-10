import { useLoaderData } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function AllPostsPage() {
  const { allPosts } = useLoaderData();

  return (
    <>
      <div className='border-b border-zinc-800 pb-2 text-xl font-semibold'>
        Recent Posts
      </div>
      <div>
        <div className='grid grid-cols-3 gap-4'>
          {allPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>{' '}
    </>
  );
}
