'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Mock fetch function — replace with real API call later
async function fetchVolunteerData(id: string) {
  // Replace with actual fetch(`/api/volunteer/${id}`) call
  const res = await fetch(`http://localhost:3000/api/volunteer/${id}`, {
    cache: "no-store",
  });
  
  const data = await res.json();
  return data;
}

export default function EditVolunteerPage() {
  const { id } = useParams<{ id: string }>();
  const [volunteer, setVolunteer] = useState<any>(null);
  let vol:any;
  useEffect(() => {
    if(id){
      fetchVolunteerData(id).then(setVolunteer);
    }  
  }, [id]);

  if (!volunteer) {
    return <div className="text-white p-6">Loading volunteer data...</div>;
  }

  if(volunteer){
    vol = volunteer.volunteer;
  }

  const fields = [
    ['fName', 'First Name', vol.f_name],
    ['lName', 'Last Name', vol.l_name],
    ['opportunity', 'Preferred Centers', vol.Opportunity?.map((o:any) => o.name) ?? []],
    ['skills', 'Skills/Interests', vol.VolunteerInfo?.[0]?.skills ?? []],
    ['avail_times', 'Availability Times', vol.VolunteerInfo[0].avail_times],
    ['address', 'Address', vol.ContactInfo[0].Address[0].address],
    ['city', 'City', vol.ContactInfo[0].Address[0].city],
    ['state', 'State', vol.ContactInfo[0].Address[0].state],
    ['zip', 'Zip', vol.ContactInfo[0].Address[0].zip],
    ['phone', 'Phone Number', vol.ContactInfo[0].phone],
    ['email', 'Email', vol.ContactInfo[0].email],
    ['ed_background', 'Educational Background', vol.VolunteerInfo[0].ed_background],
    ['licenses', 'Current Licenses', vol.VolunteerInfo[0].licenses],
    ['first_name', 'Emergency Contact First Name', vol.EmergencyContactInfo[0].first_name],
    ['last_name', 'Emergency Contact Last Name', vol.EmergencyContactInfo[0].last_name],
    ['ec_phone', 'Emergency Contact Phone', vol.EmergencyContactInfo[0].phone],
    ['ec_email', 'Emergency Contact Email', vol.EmergencyContactInfo[0].email],
    ['driver_license_on_file', "Driver's License on File", volunteer.driver_license_on_file ? 'true' : 'false', 'select', ['true', 'false']],
    ['ssn_on_file', 'Social Security Card on File', volunteer.ssn_on_file ? 'true' : 'false', 'select', ['true', 'false']],
    ['approvalStatus', 'Approval Status', volunteer.approval_status, 'select', ['Approved', 'Pending', 'Disapproved', 'Inactive']],  
  ];
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const volunteerData: any = {};
    const volunteerInfoData: any = {};
    const contactData: any = {};
    const emergencyContactData: any = {};
  
    // dynamically map fields to correct table
    fields.forEach(([key, label]) => {
      const value = formData.get(key);
      if (!value) return;
  
      let val: any = value;
      // convert comma-separated values to arrays
      if (['Preferred Centers', 'Skills/Interests', 'Availability Times', 'Current Licenses'].includes(label)) {
        val = (value as string).split(',').map((v) => v.trim()).filter(Boolean);
      } else if (value === 'true' || value === 'false') {
        val = value === 'true';
      }
  
      // assign to table based on label
      if (['First Name', 'Last Name', 'Approval Status'].includes(label)) volunteerData[key] = val;
      else if (['Skills/Interests', 'Availability Times', 'Current Licenses', 'Educational Background'].includes(label))
        volunteerInfoData[key] = val;
      else if (['Phone Number', 'Email', 'Address', 'City', 'State', 'Zip'].includes(label)) contactData[key] = val;
      else if (['Emergency Contact First Name', 'Emergency Contact Last Name', 'Emergency Contact Phone', 'Emergency Contact Email'].includes(label))
        emergencyContactData[key] = val;
    });
  
    // send PATCH requests only if data exists
    if (Object.keys(volunteerData).length > 0)
      await fetch(`http://localhost:3000/api/volunteer/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(volunteerData) });
  
    if (Object.keys(volunteerInfoData).length > 0)
      await fetch(`http://localhost:3000/api/volunteerInfo/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(volunteerInfoData) });
  
    if (Object.keys(contactData).length > 0)
      await fetch(`http://localhost:3000/api/contactInfo/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactData) });
  
    if (Object.keys(emergencyContactData).length > 0)
      await fetch(`http://localhost:3000/api/emergencyContactInfo/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(emergencyContactData) });
  
    alert('Changes saved successfully!');
    window.location.href = "/manageVolunteers";
  };

  return (
    <div className="text-white min-h-screen p-6 font-sans pt-25">
      <form onSubmit={handleSubmit} className="bg-[#0c102f] p-6 rounded-lg shadow-lg max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(([key, label, value, type, options]) => (
      <div key={key} className="col-span-1">
        <label htmlFor={key} className="block text-zinc-200 mb-1">{label}</label>

        {type === 'select' ? (
          <select
            id={key}
            name={key}
            defaultValue={value}
            className="w-full p-2 bg-[#12173f] text-white border border-zinc-300 rounded"
          >
            {options?.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt === 'true' ? 'Yes' : opt === 'false' ? 'No' : opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id={key}
            name={key}
            defaultValue={value}
            className="w-full p-2 bg-[#12173f] text-white border border-zinc-300 rounded"
          />
        )}
      </div>
    ))}

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

