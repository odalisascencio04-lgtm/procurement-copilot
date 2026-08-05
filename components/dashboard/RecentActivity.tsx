"use client";

const activities = [
  "Supplier Dell added",
  "Purchase Order #102 approved",
  "Contract uploaded",
  "AI analyzed supplier performance",
  "Spend report generated",
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="rounded-xl bg-slate-50 p-4"
          >
            ✅ {activity}
          </div>

        ))}

      </div>

    </div>
  );
}