'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Volunteer = {
  id: number;
  name: string;
  status: 'Approved' | 'Pending' | 'Disapproved' | 'Inactive';
};

const defaultVolunteers: Volunteer[] = [
  { id: 1, name: 'Adam Adams', status: 'Approved' },
  { id: 2, name: 'Billy Bills', status: 'Pending' },
  { id: 3, name: 'Carl Carlson', status: 'Approved' },
  { id: 4, name: 'Dan Daniels', status: 'Inactive' },
  { id: 5, name: 'Eve Everson', status: 'Disapproved' },
];

const filters = [
  'All',
  'Approved/Pending',
  'Approved',
  'Pending',
  'Disapproved',
  'Inactive',
];

export default function VolunteerSummaryPage() {
  const [filter, setFilter] = useState('Approved');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredVolunteers = defaultVolunteers.filter((v) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Approved/Pending' && (v.status === 'Approved' || v.status === 'Pending')) ||
      v.status === filter;

    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className=" min-h-screen text-white p-6 font-sans pt-20">

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div>
          <label htmlFor="filter" className="block mb-1">Change Volunteer Filter</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full sm:w-64"
          >
            {filters.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="search" className="block mb-1">Search Volunteers</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter name..."
            className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full"
          />
        </div>

        <button
          onClick={() => router.push('/volunteerform')}
          className="bg-[#448243] hover:bg-[#2e582e] px-4 py-2 rounded"
        >
          + Add New Volunteer
        </button>
      </div>

      {/* Volunteer Table */}
      <table className="w-full table-auto text-left border-collapse bg-[#12173f] rounded">
        <thead>
          <tr className="border-b border-zinc-300">
            <th className="p-3">Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVolunteers.map((vol) => (
            <tr key={vol.id} className="border-b border-zinc-300 hover:bg-[#1c2355]">
              <td className="p-3">{vol.name}</td>
              <td className="p-3">{vol.status}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => alert(`Viewing matches for ${vol.name}`)}
                  className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded"
                >
                  View Matches
                </button>
                <a href={`/volunteerInfo/${vol.id}`}>
                  <button
                    className="text-sm bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </a>
              </td>
            </tr>
          ))}
          {filteredVolunteers.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-zinc-400">No volunteers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
