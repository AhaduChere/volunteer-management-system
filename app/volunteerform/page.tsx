'use client'
import React from "react";

export default function Page() {
  class Volunteer {
    fName: string = "";
    lName: string = "";
    phone: string = "";
    email: string = "";
    address: string = "";
    city: string = "";
    state: string = "";
    zip: string = "";
    skills: string[] = ["", "" ];
    availTimes: string[] = ["", ""];
    edBackground: string = "";
    licenses: string[] = [""];
    ecFirstName: string = "";
    ecLastName: string = "";
    ecPhone: string = "";
    ecEmail: string = "";
    ecAddress: string = "";
    driverLicense: boolean = false;
    ssNumber: boolean = false;
    approvalStatus: string = "Pending";
  }

  const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
    "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  function FormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const arrayFields = ["skills", "availTimes", "licenses"];
    const data: Record<string, any> = {};

    for (const el of Array.from(form.elements)) {
      const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input || !("name" in input) || !input.name) continue;
      const name = input.name;

      if (input instanceof HTMLInputElement && input.type === "checkbox") {
        data[name] = input.checked;
      } else if (arrayFields.includes(name)) {
        data[name] = input.value
          ? input.value.split(",").map(s => s.trim()).filter(Boolean)
          : [];
      } else {
        data[name] = input.value;
      }
    }

    const newVolunteer = new Volunteer();
    Object.assign(newVolunteer, data);

    const addVolunteer = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/volunteer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVolunteer),
        });
        if (response.ok) {
          alert("Volunteer Added");
          window.location.reload();
        } else {
          alert(data.error || "Failed to add volunteer");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Network error");
      }
    };
    addVolunteer();
  }

  return (
    <div className="min-h-screen text-white p-6 font-sans pt-20">
      <div className="bg-[#0b122d] rounded-md p-6 border border-zinc-700 max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">New Volunteer Form</h2>

        <form onSubmit={FormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className=" block text-lg text-center text-zinc-300 -mb-1">Personal Information </label>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Name</label>
              <div className="grid grid-cols-2 gap-3">
                <input name="fName" placeholder="First Name" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="lName" placeholder="Last Name" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Contact info</label>
              <div className="grid grid-cols-2 gap-3">
                <input name="email" placeholder="Email" type="email" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="phone" placeholder="Phone Number" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Address</label>
              <input name="address" placeholder="Street address" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full mb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input name="city" placeholder="City" className="col-span-2 bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <select name="state" defaultValue="" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full">
                  <option value="" disabled>Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <input name="zip" placeholder="ZIP" inputMode="numeric" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full mt-3" />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Emergency Contact</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="ecFirstName" placeholder="First Name" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="ecLastName" placeholder="Last Name" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="ecPhone" placeholder="Phone" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="ecEmail" placeholder="Email" type="email" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
                <input name="ecAddress" placeholder="Address" className="col-span-1 sm:col-span-2 bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className=" block text-lg text-center text-zinc-300 -mb-1">Volunteer Information </label>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">Skills <span className="text-xs text-zinc-400">(comma separated)</span></label>
              <textarea name="skills" placeholder="Event setup, etc" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full h-28 resize-none" />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Availability <span className="text-xs text-zinc-400">(comma separated)</span></label>
              <textarea name="availTimes" placeholder="Weekends, etc" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full h-24 resize-none" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <label className="block text-sm mb-1 text-zinc-300">Licenses / Certifications <span className="text-xs text-zinc-400">(comma separated)</span></label>
              <textarea name="licenses" placeholder="EMT, etc " className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full h-20 resize-none" />

              <label className="block text-sm mb-1 text-zinc-300">Education</label>
              <textarea name="edBackground" placeholder="Highschool Diploma, etc" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full h-20 resize-none" />
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-4">
            <div className="flex flex-wrap gap-4 items-center">
              <label className="inline-flex items-center text-sm text-zinc-200">
                <input type="checkbox" name="driverLicense" className="h-4 w-4 rounded-sm bg-transparent" />
                <span className="ml-2">Drivers License on File</span>
              </label>

              <label className="inline-flex items-center text-sm text-zinc-200">
                <input type="checkbox" name="ssNumber" className="h-4 w-4 rounded-sm bg-transparent" />
                <span className="ml-2">SS Number on File</span>
              </label>

              <label className="inline-flex items-center text-sm text-zinc-200">
                <span className="mr-2">Approval Status</span>
                <select name="approvalStatus" defaultValue="Pending" className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-3">
            <button type="submit" className="w-full h-fit px-8 py-2 bg-[#536dac] hover:bg-[#4c5a7a] duration-200 text-white font-semibold rounded-lg cursor-pointer select-none active:mt-0.5">
              Submit
            </button>
          </div>
        </form>
      </div >
    </div >
  );
}
