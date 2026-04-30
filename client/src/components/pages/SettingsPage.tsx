import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../data/weather';
import { deleteAccount, getCurrentUser, logout } from '../../data/auth';
import { ROUTES } from '../utilities/navigation';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate(ROUTES.LOGIN);
  }

  async function handleDeleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteAccount();
      setUser(null);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete account.');
    }
  }

  if (loading) return <p>Loading settings…</p>;

  if (!user) {
    return (
      <div className="max-w-xl bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Settings</h2>
        <p className="text-slate-600 mb-4">
          Please log in to manage your account.
        </p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.LOGIN)}
          className="rounded-lg bg-slate-700 text-white px-4 py-2 hover:bg-slate-800"
        >
          Go to login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-600">
          Logged in as <strong>{user.username}</strong>
        </p>
      </div>

      {message && (
        <p className="text-sm text-red-600">
          {message}
        </p>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg bg-slate-700 text-white py-2 hover:bg-slate-800"
        >
          Log out
        </button>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="w-full rounded-lg bg-red-600 text-white py-2 hover:bg-red-700"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
