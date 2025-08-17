// app/volunteers/page.tsx  (Server Component)
import OpportunitiesPage from '@/components/OpportunitiesPage';
import { Opportunity } from '@prisma/client';

export default async function manageOpportunities() {
  const res = await fetch('http://localhost:3000/api/opportunity', {
    cache: "no-store",
  });
  
  const data = await res.json();

  // Extract the array and map to your Volunteer type
  const opportunities = (data.opportunities || []).map((opp: Opportunity) => ({
    id: opp.opp_id,
    title: opp.title,
    center: opp.center_name,
    postedDate: opp.date_posted
  }));
  console.log(opportunities);

  return <OpportunitiesPage intialOpportunities={opportunities} />;
}
