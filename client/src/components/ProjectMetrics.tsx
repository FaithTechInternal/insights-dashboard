/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

interface Metrics {
  repoCount: number;
  totalCommits: number;
  // Add more metrics as needed
}

interface ProjectMetricsProps {
  metrics: Metrics;
}

const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Project Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Repositories</h3>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.repoCount}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Total Commits</h3>
          <p className="text-3xl font-bold text-green-600">
            {metrics.totalCommits}
          </p>
        </div>
        {/* Add more metric displays as needed */}
      </div>
    </div>
  );
};

export default ProjectMetrics;
