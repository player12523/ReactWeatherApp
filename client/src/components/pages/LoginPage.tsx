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
