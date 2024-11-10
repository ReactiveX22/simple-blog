import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function PostCard({ id, title, author, content }) {
  return (
    <Link
      className='h-[168px] bg-zinc-900 p-4 transition-all duration-300 hover:bg-zinc-800'
      to={`${id}`}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-medium'>{title}</h1>
          <h3 className='w-fit text-sm text-zinc-400 hover:text-blue-500'>
            {author}
          </h3>
        </div>
        <p className='line-clamp-3'>{content}</p>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};
