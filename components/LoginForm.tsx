'use client'
import Image from 'next/image';

export default function LoginForm() {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    if (!username || !password) return;
    const login = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "login", username, password }),
        });
        const data = await response.json();
        if (response.ok && data.token) {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          document.cookie = `session_token=${data.token}; path=/; expires=${date.toUTCString()}`;
          window.location.reload();
        } else {
          alert(data.error || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Network error");
      }
    };
    await login();
  };
  return (
    <form onSubmit={handleLogin} className="flex justify-center items-center h-screen">
      <div className="min-h-[400px] min-w-[500px] px-8 py-6 bg-gray-900 rounded-xl">
        <div className="flex flex-col items-center h-full select-none mb-2">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <Image src="/Camera.svg" alt="Camera Icon" width={46} height={46} />
            <p className="m-0 text-[22px] font-semibold text-white">Admin Login</p>
          </div>
          <div className="w-full flex flex-col gap-3.5">
            <label className="font-semibold text-xs text-gray-400">Username</label>
            <input
              placeholder="Username"
              className="border rounded-lg px-3 py-2.5 mb-5 text-sm w-full outline-none border-gray-500 bg-gray-900 text-white"
              name="username"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3.5">
            <label className="font-semibold text-xs text-gray-400">Password</label>
            <input
              placeholder="••••••••"
              className="border rounded-lg px-3 py-2.5 mb-5 text-sm w-full outline-none border-gray-500 bg-gray-900 text-white"
              type="password"
              name="password"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="px-8 py-2 bg-[#536dac] hover:bg-[#4c5a7a] duration-200 text-white w-full font-semibold rounded-lg cursor-pointer select-none active:mt-0.5">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
