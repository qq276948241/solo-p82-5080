import { NavLink } from 'react-router-dom';
import { BookOpen, Plus, BarChart3 } from 'lucide-react';

export function TabBar() {
  const tabs = [
    {
      path: '/',
      icon: BookOpen,
      label: '日记',
    },
    {
      path: '/add',
      icon: Plus,
      label: '记录',
    },
    {
      path: '/stats',
      icon: BarChart3,
      label: '统计',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-coffee-dark/5">
      <div className="container">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === '/'}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center flex-1 h-full transition-all duration-200
                  ${isActive ? 'text-latte' : 'text-coffee-light hover:text-coffee-medium'}`
                }
              >
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                    ${tab.path === '/add'
                      ? 'bg-coffee-dark text-white -mt-6 shadow-lg shadow-coffee-dark/30 hover:bg-latte-dark'
                      : ''}`
                  }
                >
                  <Icon
                    size={tab.path === '/add' ? 22 : 20}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className={`
                    text-xs mt-1 font-medium
                    ${tab.path === '/add' ? 'text-coffee-dark' : ''}`
                  }
                >
                  {tab.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
