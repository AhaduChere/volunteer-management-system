'use client'
import router from 'next/router';
import React from 'react';
export default function page1() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6 font-sans">

        <div className="flex flex-row gap-6 w-full max-w-sm">
          <a href="/manageVolunteers">
            <button
              className="w-full py-4 px-6 bg-[#12173f] hover:scale-105 border-transparent border-3 hover:border-[#ffffff] transition-colors duration-500  rounded-lg text-lg font-semibold flex flex-col items-center justify-center gap-2"
            >
               <img src="/volunteer.svg" alt="Camera Icon" width={1000} height={1000} />
              Manage Volunteers
            </button>
          </a>

        <a href="/manageOpportunities">
            <button
              className="w-full py-4 px-6 bg-[#12173f] hover:scale-105 border-transparent border-2 hover:border-[#ffffff] transition-colors duration-100  rounded-lg text-lg font-semibold flex flex-col items-center justify-center gap-2"
            >
              <img src="/opportunity.svg" alt="Camera Icon" width={1000} height={1000} />
              Manage Opportunities
            </button>        
          </a>
        </div>
      </div>
  )
}
