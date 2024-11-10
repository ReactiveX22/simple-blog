import { useLoaderData } from 'react-router-dom';
import UpdatePostForm from '../components/UpdatePostForm';

export default function EditPostPage() {
  const { post } = useLoaderData();
  return (
    <div className='mx-auto flex w-[840px] flex-col gap-6'>
      <div>
        <UpdatePostForm {...post} />
      </div>
    </div>
  );
}
