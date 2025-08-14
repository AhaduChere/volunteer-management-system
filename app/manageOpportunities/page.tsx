'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock data
type Opportunity = {
  id: number;
  title: string;
  center: string;
  postedDate: string; // ISO string
};

const mockOpportunities: Opportunity[] = [
  { id: 1, title: 'Food Drive Organizer', center: 'Downtown Center', postedDate: '2025-07-01' },
  { id: 2, title: 'Clothing Distribution', center: 'Uptown Center', postedDate: '2025-08-01' },
  { id: 3, title: 'Mentorship Program', center: 'Downtown Center', postedDate: '2025-06-10' },
];

export default function OpportunitiesPage(){
  const router = useRouter();
  const [filter, setFilter] = useState<'Most Recent' | 'By Center'>('Most Recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);

  const filtered = opportunities.filter((opp) => {
    const postedDate = new Date(opp.postedDate);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const matchesFilter =
      filter === 'Most Recent' ? postedDate >= sixtyDaysAgo : true;

    const matchesSearch =
      filter === 'By Center'
        ? opp.center.toLowerCase().includes(searchTerm.toLowerCase())
        : opp.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-zinc-950 min-h-screen text-white p-6 font-sans">
      <h2 className="text-blue-400 text-2xl font-bold mb-6">Manage Opportunities</h2>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="filter" className="block mb-1 text-zinc-200">Change Opportunity Filter</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full bg-zinc-800 border border-zinc-600 text-white p-2 rounded"
          >
            <option value="Most Recent">Most Recent (60 days)</option>
            <option value="By Center">By Center</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="search" className="block mb-1 text-zinc-200">
            Search {filter === 'By Center' ? 'by Center' : 'by Title'}
          </label>
          <input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Enter ${filter === 'By Center' ? 'center name' : 'title'}...`}
            className="w-full bg-zinc-800 border border-zinc-600 text-white p-2 rounded"
          />
        </div>

        <button
          onClick={() => router.push('/opportunityform')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded self-end"
        >
          + Add New Opportunity
        </button>
      </div>

      {/* Table */}
      <table className="w-full bg-zinc-900 rounded overflow-hidden">
        <thead className="bg-zinc-800">
          <tr className="text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Center</th>
            <th className="p-3">Posted</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((opp) => (
            <tr key={opp.id} className="border-b border-zinc-800 hover:bg-zinc-800">
              <td className="p-3">{opp.title}</td>
              <td className="p-3">{opp.center}</td>
              <td className="p-3">{new Date(opp.postedDate).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => alert(`Viewing matches for "${opp.title}"`)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  View Matches
                </button>
                <button
                  onClick={() => router.push(`/opportunities/${opp.id}/edit`)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => setOpportunities((prev) => prev.filter((o) => o.id !== opp.id))}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-zinc-400">No opportunities found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
