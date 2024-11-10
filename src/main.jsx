import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { allPostLoader, postLoader } from './loaders/postLoader';
import AllPostsPage from './pages/AllPostsPage';
import CreatePostPage from './pages/CreatePostPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/layout';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'posts/', element: <AllPostsPage />, loader: allPostLoader },
      { path: 'posts/:id', element: <PostPage />, loader: postLoader },
      { path: 'posts/:id/edit', element: <EditPostPage />, loader: postLoader },
      { path: 'create/', element: <CreatePostPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
