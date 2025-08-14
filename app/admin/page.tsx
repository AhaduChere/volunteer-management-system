'use client'
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React from 'react';
export default function page1() {

  const Logout = async () => {
    document.cookie = 'session_token=; path=/; max-age=0;';
    window.location.reload();
  }
  return (
    <><div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center text-white p-6 font-sans">
      <h2 className="text-blue-400 text-3xl font-bold mb-8">Admin Options</h2>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <a href="/manageVolunteers">
          <button
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition"
          >
            Manage Volunteers
          </button>
        </a>

      <a href="/manageOpportunities">
          <button
            onClick={() => router.push('/opportunity')}
            className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition"
          >
            Manage Opportunities
          </button>
        </a>
      </div>
    </div><div>
        <div className="text-center ">
          <button onClick={Logout} className="cursor-pointer font-bold text-black"> Click to Logout</button>
        </div>
      </div></>

  )
}

