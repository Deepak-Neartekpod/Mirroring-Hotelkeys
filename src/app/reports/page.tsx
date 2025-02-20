"use client";

import { Card } from "@/components/ui/card";
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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm w-full p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Reports
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Manage and view all reports efficiently
        </p>
      </div>

      {/* Reports Grid */}
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              onClick={() => handleReportClick(report)}
            >
              <div className="flex items-center space-x-4 p-6">
                <div className="bg-blue-50 group-hover:bg-blue-100 rounded-lg p-3 transition-colors">
                  {report.icon || (
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m0 0V9m0 8h6m-6 0H7m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800">
                    {report.name}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {report.description || "View detailed report"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Selected Report */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedReport.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Details about {selectedReport.name}...
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}