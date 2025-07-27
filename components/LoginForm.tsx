'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserID, setUserID] = useState('');

  const Login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) return;

    const ValidLogin = false;

    // TODO: Database check  
    // If Found save UserID
    // Then Set ValidLogin true

    if (ValidLogin) {
      // pull and set UserID
      // route to admin page
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <form onSubmit={Login} className="relative flex justify-center items-center mt-44">
      <div className="min-h-[360px] min-w-[464px] px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <Image src="/Camera.svg" alt="Camera Icon" width={32} height={32} className="w-8 h-8" />
            <p className="m-0 text-[16px] font-semibold dark:text-white">Admin Login</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Username</label>
            <input
              placeholder="Username"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900 text-white"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-xs text-gray-400">Password</label>
          <input
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900 text-white"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-8 py-2 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg cursor-pointer select-none active:mt-0.5"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
