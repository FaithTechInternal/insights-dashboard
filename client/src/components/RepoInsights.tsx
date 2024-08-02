/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

interface RepoInsight {
  name: string;
  description?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  latestVersion?: string;
  primaryLanguage?: string;
  license?: string;
  createdAt?: string;
  updatedAt?: string;
  size?: number;
  totalContributors?: number;
  error?: string;
}

interface RepoInsightsProps {
  insights: RepoInsight;
}

const RepoInsights: React.FC<RepoInsightsProps> = ({ insights }) => {
  if (insights.error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {insights.error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{insights.name}</h3>
      <p className="text-gray-600 mb-4">
        {insights.description || "No description available"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <span className="font-semibold">Stars:</span>{" "}
            {insights.stars ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold">Forks:</span>{" "}
            {insights.forks ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold">Open Issues:</span>{" "}
            {insights.openIssues ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold">Latest Version:</span>{" "}
            {insights.latestVersion || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Total Contributors:</span>{" "}
            {insights.totalContributors ?? "N/A"}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Primary Language:</span>{" "}
            {insights.primaryLanguage || "N/A"}
          </p>
          <p>
            <span className="font-semibold">License:</span>{" "}
            {insights.license || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {insights.createdAt
              ? new Date(insights.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span>{" "}
            {insights.updatedAt
              ? new Date(insights.updatedAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Size:</span>{" "}
            {insights.size ? `${insights.size} KB` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepoInsights;
