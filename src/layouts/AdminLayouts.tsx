// components/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Link } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-gray-800">
        <div className="p-4 text-white">
          {/* Sidebar content */}
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <Divider className='bg-gray-300 mt-2'/>
          {/* Add sidebar links here */}
          <ul className="mt-4">
            <li className="py-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
            </li>
            <li className="py-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                Users
              </Link>
            </li>
            {/* Add more sidebar links */}
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gray-200">
        {/* Navbar */}
        <nav className="bg-white shadow p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Welcome, Ariena!</h1>
            {/* Add more navbar items here */}
          </div>
        </nav>
        {/* Page content */}
        <div className="container mx-auto p-4">
          {/* Page content goes here */}
         <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
