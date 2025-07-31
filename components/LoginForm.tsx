'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;
    const login = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json()
        if (data) {
          document.cookie = `UserID=${data.UserID}; path=/;`;
          window.location.reload();
        } else {
          alert('Invalid Credentials');
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    await login();
  };

  return (
    <form onSubmit={handleLogin} className="relative flex justify-center items-center mt-44">
      <div className="min-h-[384px] min-w-[464px] px-8 py-6 bg-gray-900 rounded-xl">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <Image src="/Camera.svg" alt="Camera Icon" width={32} height={32} className="w-8 h-8" />
            <p className="m-0 text-[16px] font-semibold text-white">Admin Login</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <label className="font-semibold text-xs text-gray-400">Username</label>
            <input
              placeholder="Username"
              className="border rounded-lg px-3 py-2.5 mb-5 text-sm w-full outline-none border-gray-500 bg-gray-900 text-white"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <label className="font-semibold text-xs text-gray-400">Password</label>
          <input
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2.5 mb-5 text-sm w-full outline-none border-gray-500 bg-gray-900 text-white"
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
            className="px-8 py-2 bg-blue-500 text-white w-full font-semibold rounded-lg cursor-pointer select-none active:mt-0.5">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
