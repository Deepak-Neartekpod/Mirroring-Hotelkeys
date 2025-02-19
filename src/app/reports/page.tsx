"use client";

import { Card } from "@/components/ui/card";
import "./reports.css"; // Ensure you have a CSS file for styles

import { useRouter } from "next/navigation";
import { useState } from "react";
import { reports } from "@/data/data";

export default function ReportsPage() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportClick = (report) => {
    router.push(`/reports/${report.id}`);
    setSelectedReport(report);
  };

  return (
    <div className="reports-page">
      <div className="bg-default min-h-screen">
        <div className="bg-header w-full p-4">
          <h1 className="text-title text-center text-2xl font-semibold">
            Reports
          </h1>
        </div>

        <div className="mx-auto max-w-7xl p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {reports.map((report) => (
              <Card
                key={report.id}
                className="hover:bg-hover group relative cursor-pointer overflow-hidden p-4 transition-colors"
                onClick={() => handleReportClick(report)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-icon group-hover:bg-icon-hover rounded-lg p-2 transition-colors">
                    {report.icon}
                  </div>
                  <div className="flex items-center">
                    <span className="text-text mr-2 font-medium">
                      {report.id}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {report.name}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {selectedReport && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{selectedReport.name}</h2>
              <p className="mt-2">Details about {selectedReport.name}...</p>
              <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
