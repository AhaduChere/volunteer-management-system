'use client'
import { useParams } from "next/navigation";
import React from "react";

export default function EditOpportunityPage() {
    const { id } = useParams<{ id: string }>();
  async function FormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data: Record<string, any> = {};

    // Collect form values
    for (const el of Array.from(form.elements)) {
      const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input || !("name" in input) || !input.name) continue;
      data[input.name] = input.value;
    }

    // Create plain object for API
    const editOpportunity = {
      centerName: data.centerName,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/opportunity/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editOpportunity),
      });

      if (response.ok) {
        alert("Opportunity Edited!");
        window.location.href = "/manageOpportunities"; // redirect to manage opportunities
      } else {
        const res = await response.json();
        alert(res.error || "Failed to edit opportunity");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Network error");
    }
  }

  return (
    <div className="min-h-screen text-white p-6 font-sans pt-20">
      <div className="bg-[#0b122d] rounded-md p-6 border border-zinc-700 max-w-lg mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Edit Opportunity
        </h2>

        <form onSubmit={FormSubmit} className="space-y-6">

          <div>
            <label className="block text-sm mb-1 text-zinc-300">Center</label>
            <input
              name="centerName"
              placeholder="Downtown Center"
              className="bg-[#12173f] border border-zinc-300 text-white p-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-fit px-8 py-2 bg-[#536dac] hover:bg-[#4c5a7a] duration-200 text-white font-semibold rounded-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
