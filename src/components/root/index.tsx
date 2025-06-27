import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import routesConfig from '@/routesConfig';
import { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredRoutes = routesConfig.filter((r) =>
    r.label.toLowerCase().includes(query.toLowerCase()),
  );

  // Reset selected index when filtered routes change
  useEffect(() => {
    // Auto-select first item when there are filtered results and query is not empty
    if (filteredRoutes.length > 0 && query.trim() !== '') {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [filteredRoutes.length, query]);

  // Handle Cmd+F to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle keyboard navigation from search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && query.trim() === '') {
      searchInputRef.current?.blur();
      setSelectedIndex(-1);
      return;
    }

    // Handle Enter key to navigate to selected route
    if (
      e.key === 'Enter' &&
      selectedIndex >= 0 &&
      filteredRoutes[selectedIndex]
    ) {
      e.preventDefault();
      navigate({ to: filteredRoutes[selectedIndex].path });
      return;
    }

    // Handle arrow key navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Move to next item, but clamp to last valid index to prevent going out of bounds
      const nextIndex = Math.min(selectedIndex + 1, filteredRoutes.length - 1);
      setSelectedIndex(nextIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex === 0) {
        // If at first item, deselect everything
        setSelectedIndex(-1);
      } else if (selectedIndex > 0) {
        // Move to previous item
        const prevIndex = selectedIndex - 1;
        setSelectedIndex(prevIndex);
      }
      // If selectedIndex is < 0 (no selection), do nothing on ArrowUp
    }
  };

  return (
    <>
      <div className='flex'>
        <div className='h-screen w-60 bg-amber-200 text-sm p-5'>
          <div className='mb-5'>
            <input
              ref={searchInputRef}
              type='search'
              placeholder='Search… (⌘F)'
              className='w-full bg-white text-sm px-4 py-2 border-amber-400 focus:border-amber-600 focus:shadow-md focus:outline-0 border rounded-full'
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <div className='space-y-1'>
            {filteredRoutes.map((route, index) => (
              <div key={route.path}>
                <Link
                  to={route.path}
                  className={`
                    [&.active]:font-bold block px-2 py-1 rounded 
                    ${index === selectedIndex ? 'bg-amber-300' : 'hover:bg-amber-100'}
                  `}
                >
                  {route.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1 p-10  h-screen'>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

export default Home;
