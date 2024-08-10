// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-teal-700 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-teal-600">Admin Portal</h2>
      <ul className="flex-1 mt-4">
        {[
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Listings', path: '/listings' },
          { name: 'Authors', path: '/authors' },
          { name: 'Categories', path: '/categories' },
          { name: 'Reviews', path: '/reviews' },
          { name: 'Service Requests', path: '/service-requests' },
          { name: 'Users', path: '/users' },
          { name: 'Organizations', path: '/organizations' },
          { name: 'Settings', path: '/settings' },
        ].map((item) => (
          <li key={item.name} className="p-4 hover:bg-teal-600 transition-colors duration-200">
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;