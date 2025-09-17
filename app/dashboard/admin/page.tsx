"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  TrendingUp,
  Briefcase,
  Banknote,
} from "lucide-react";
import api from "@/lib/service/api";

type CountsResponse = {
  testimonials: number;
  franchises: number;
  services: number;
  blogs: number;
  leads: number;
};

export default function Dashboard() {
  const [counts, setCounts] = useState<CountsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await api.get<CountsResponse>("/dashboardCount");
        setCounts(res.data);
      } catch (err: any) {
        console.error("Failed to fetch counts:", err);
        setError("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const formatNumber = (value: number) => value.toLocaleString();

  if (loading)
    return <p className="text-center py-10">Loading dashboard stats...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  const stats = [
    {
      name: "Testimonials",
      value: counts?.testimonials ?? 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Franchises",
      value: counts?.franchises ?? 0,
      icon: Briefcase,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Services",
      value: counts?.services ?? 0,
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Blogs",
      value: counts?.blogs ?? 0,
      icon: Banknote,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Leads",
      value: counts?.leads ?? 0,
      icon: UserCheck,
      color: "bg-pink-200 text-pink-600",
    },
  ];

  return (
    <div className="space-y-8 py-4">
      <h2 className="text-xl font-semibold text-slate-800">Dashboard Stats</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-lg cursor-pointer hover:bg-gray-50"
            onClick={() => alert(`Clicked on ${stat.name}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {formatNumber(stat.value)}
                </p>
              </div>
              <div className={`rounded-full p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
