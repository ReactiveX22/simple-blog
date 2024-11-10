import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postService';
import FormGroup from './FormGroup';
import { checkPostContent } from './formValidator';

export default function CreatePostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await createPost(data);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-6'>
        <FormGroup errorMessage={errors?.title?.message}>
          <input
            type='text'
            name='title'
            className='w-full border-b border-zinc-800 bg-transparent py-3 text-2xl outline-none'
            placeholder='Title'
            {...register('title', {
              required: { value: true, message: 'Title is required.' },
            })}
          />
        </FormGroup>
        <FormGroup errorMessage={errors?.content?.message}>
          <textarea
            rows={18}
            className='post-textarea w-full'
            placeholder='Write your post here...'
            name='content'
            {...register('content', {
              required: { value: true, message: 'Write your post' },
              validate: { hasTenWords: (value) => checkPostContent(value) },
            })}
          ></textarea>
        </FormGroup>
        <div className='flex justify-end'>
          <button className='border border-zinc-800 bg-zinc-900 px-4 py-2 font-medium'>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
