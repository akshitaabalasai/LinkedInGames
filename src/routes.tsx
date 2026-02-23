import { createBrowserRouter } from 'react-router';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">404</h1>
          <p className="text-gray-600 mb-4">Page not found</p>
          <a href="/login" className="text-[#0a66c2] hover:underline">
            Go to login
          </a>
        </div>
      </div>
    ),
  },
]);
