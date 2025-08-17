// app/volunteers/page.tsx  (Server Component)
import VolunteerSummaryPage from '@/components/VolunteerSummary';
import { Volunteer } from '@prisma/client';

export default async function manageVolunteers() {
  const res = await fetch('http://localhost:3000/api/volunteer', {
    cache: "no-store",
  });
  
  const data = await res.json();

  // Extract the array and map to your Volunteer type
  const volunteers = (data.volunteers || []).map((v: Volunteer) => ({
    id: v.v_id,
    firstName: v.f_name,
    lastName: v.l_name,
    status:
      v.approval_status.toLowerCase() === 'pending'
        ? 'Pending'
        : v.approval_status.charAt(0).toUpperCase() + v.approval_status.slice(1),
  }));

  return <VolunteerSummaryPage initialVolunteers={volunteers} />;
}
