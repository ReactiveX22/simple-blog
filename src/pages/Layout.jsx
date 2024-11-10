import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='mx-auto flex w-[1152px] flex-col'>
      <nav className='h-[72px] bg-zinc-900 text-lg font-medium'>
        <ul className='flex h-full'>
          <li>
            <Link
              to='/'
              className='flex h-full items-center justify-center px-4 py-2 text-2xl font-semibold'
            >
              Simple Blog
            </Link>
          </li>
          <li>
            <NavLink
              className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-zinc-800'
              to='/'
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-zinc-800'
              to='/posts'
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex h-full items-center justify-center px-4 py-2 transition-all duration-300 hover:bg-zinc-800'
              to='/create'
            >
              Create Post
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <div className='mb-16 mt-16 flex flex-col gap-6'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
