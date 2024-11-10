import CreatePostForm from '../components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className='mx-auto flex w-[840px] flex-col gap-6'>
      <div>
        <CreatePostForm />
      </div>
    </div>
  );
}
