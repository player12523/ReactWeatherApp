import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from './navigation';

const navItems = [
  { path: ROUTES.HOME, icon: 'Home.png' },
  { path: ROUTES.LOCATION(0), icon: 'Location.svg' },
  { path: ROUTES.LOGIN, icon: 'Users.svg' },
];

const bottomItem = { path: ROUTES.SETTINGS, icon: 'Settings.svg' };

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex fixed top-0 left-0 h-screen w-16 bg-slate-500 flex-col items-center py-4">

        {/* Top items */}
        <div className="flex flex-col items-center space-y-4 flex-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`p-2 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-slate-600'
                  : 'hover:bg-slate-700'
              }`}
            >
              <img
                src={`../../public/navigation/${item.icon}`}
                className="w-6 h-6"
              />
            </button>
          ))}
        </div>

        {/* Bottom (Settings) */}
        <div className="mt-auto">
          <button
            onClick={() => navigate(bottomItem.path)}
            className={`p-2 rounded-lg transition ${
              location.pathname === bottomItem.path
                ? 'bg-slate-600'
                : 'hover:bg-slate-700'
            }`}
          >
            <img
              src={`/navigation/${bottomItem.icon}`}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full h-16 bg-slate-500 flex justify-around items-center">

        {[...navItems, bottomItem].map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`p-2 rounded-lg transition ${
              location.pathname === item.path
                ? 'bg-slate-600'
                : 'hover:bg-slate-700'
            }`}
          >
            <img
              src={`/navigation/${item.icon}`}
              className="w-6 h-6"
            />
          </button>
        ))}
      </div>
    </>
  );
}