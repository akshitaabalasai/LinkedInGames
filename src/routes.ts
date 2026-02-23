import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(Navigate, { to: '/login', replace: true }),
  },
  {
    path: '/login',
    element: React.createElement(Login),
  },
  {
    path: '/signup',
    element: React.createElement(Signup),
  },
  {
    path: '/dashboard',
    element: React.createElement(ProtectedRoute),
    children: [
      {
        index: true,
        element: React.createElement(Dashboard),
      },
    ],
  },
  {
    path: '*',
    element: React.createElement(
      'div',
      { className: 'min-h-screen bg-[#f3f2ef] flex items-center justify-center' },
      React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement('h1', { className: 'text-4xl mb-4' }, '404'),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Page not found'),
        React.createElement('a', { href: '/login', className: 'text-[#0a66c2] hover:underline' }, 'Go to login')
      )
    ),
  },
]);
