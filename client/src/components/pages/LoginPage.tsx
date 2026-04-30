/*
This is the Location page for the Weather App. It provides users with information about their current location and allows them to search for weather forecasts in different locations. The page includes a search bar, a list of recent searches, and a map showing the user's current location.

Functional components:
- Header: Displays the title and description of the application.
- A button for signing up or logging in to the application.
- a back button to return to the home page.

Non-functional components:
- The application should be responsive and work well on both desktop and mobile devices.
- The design should be clean and modern, using a consistent color scheme and typography.
- the sign-in page shouldn't be accessible if the user is already signed in.

Additional features imported from modules:
- Navigation bar: Allows users to navigate between different pages of the application,
  such as the home page, location page, sign-in page, and settings page.
*/

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../data/auth';
import { ROUTES } from '../utilities/navigation';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handles both login and register using the current form mode.
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage('');

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }

      navigate(ROUTES.HOME);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        {mode === 'login'
          ? 'Log in to save favourite locations and manage your account.'
          : 'Create an account so your user information can be saved.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </div>

        {message && (
          <p className="text-sm text-red-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-700 text-white py-2 hover:bg-slate-800"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMessage('');
          setMode(mode === 'login' ? 'register' : 'login');
        }}
        className="mt-4 text-sm text-sky-700 hover:underline"
      >
        {mode === 'login'
          ? 'Need an account? Register here.'
          : 'Already have an account? Login here.'}
      </button>
    </div>
  );
}
