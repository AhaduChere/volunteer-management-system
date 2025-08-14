'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Mock fetch function — replace with real API call later
async function fetchVolunteerData(id: string) {
  // Replace with actual fetch(`/api/volunteer/${id}`) call
  return {
    id,
    f_name: 'Alice',
    l_name: 'Johnson',
    username: 'alice.j',
    password: '',
    centers: 'Downtown, East Side',
    skills: 'Teaching, Cooking',
    availability: 'Weekends, Evenings',
    address: '123 Main St, Springfield, IL 62704',
    phone: '555-123-4567',
    email: 'alice@example.com',
    ed_background: 'Bachelor of Education',
    licenses: 'CPR, First Aid',
    em_contact_name: 'Jane Johnson',
    em_phone: '555-765-4321',
    em_email: 'jane.j@example.com',
    em_address: '456 Oak St, Springfield, IL 62704',
    driver_license_on_file: true,
    ssn_on_file: true,
    approval_status: 'Approved',
  };
}

export default function EditVolunteerPage() {
  const  id  =  '1'; //useParams<{ id: string }>();
  const [volunteer, setVolunteer] = useState<any>(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      fetchVolunteerData(id).then(setVolunteer);
    }
  }, [id]);

  if (!volunteer) {
    return <div className="text-white p-6">Loading volunteer data...</div>;
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen p-6 font-sans">
      <h2 className="text-blue-400 text-2xl font-bold mb-6">Edit Volunteer: {volunteer.f_name} {volunteer.l_name}</h2>

      <form className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ['First Name', 'f_name'],
          ['Last Name', 'l_name'],
          ['Username', 'username'],
          ['Password', 'password'],
          ['Preferred Centers', 'centers'],
          ['Skills/Interests', 'skills'],
          ['Availability Times', 'availability'],
          ['Address', 'address'],
          ['Phone Numbers', 'phone'],
          ['Email', 'email'],
          ['Educational Background', 'ed_background'],
          ['Current Licenses', 'licenses'],
          ['Emergency Contact Name', 'em_contact_name'],
          ['Emergency Contact Phone', 'em_phone'],
          ['Emergency Contact Email', 'em_email'],
          ['Emergency Contact Address', 'em_address'],
        ].map(([label, key]) => (
          <div key={key} className="col-span-1">
            <label htmlFor={key} className="block text-zinc-200 mb-1">{label}</label>
            <input
              id={key}
              name={key}
              defaultValue={volunteer[key]}
              type="text"
              className="w-full p-2 bg-zinc-800 text-white border border-zinc-600 rounded"
            />
          </div>
        ))}

        <div className="col-span-1">
          <label htmlFor="driver_license_on_file" className="block text-zinc-200 mb-1">Driver's License on File</label>
          <select
            id="driver_license_on_file"
            name="driver_license_on_file"
            defaultValue={volunteer.driver_license_on_file ? 'true' : 'false'}
            className="w-full p-2 bg-zinc-800 text-white border border-zinc-600 rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="ssn_on_file" className="block text-zinc-200 mb-1">Social Security Card on File</label>
          <select
            id="ssn_on_file"
            name="ssn_on_file"
            defaultValue={volunteer.ssn_on_file ? 'true' : 'false'}
            className="w-full p-2 bg-zinc-800 text-white border border-zinc-600 rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="approval_status" className="block text-zinc-200 mb-1">Approval Status</label>
          <select
            id="approval_status"
            name="approval_status"
            defaultValue={volunteer.approval_status}
            className="w-full p-2 bg-zinc-800 text-white border border-zinc-600 rounded"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Disapproved">Disapproved</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
