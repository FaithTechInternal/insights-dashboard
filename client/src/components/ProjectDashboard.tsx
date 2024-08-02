/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from "react";
import {
  fetchOrganizations,
  fetchOrgMetrics,
  fetchOrgRepoInsights,
} from "../services/api";
import OrganizationList from "./OrganizationList";
import ProjectMetrics from "./ProjectMetrics";
import RepoInsights from "./RepoInsights";

interface Organization {
  id: string;
  name: string;
}

const ProjectsDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [orgMetrics, setOrgMetrics] = useState<any | null>(null);
  const [repoInsights, setRepoInsights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrganizations()
      .then(setOrganizations)
      .catch((_err) => setError("Failed to fetch organizations"));
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      fetchOrgMetrics(selectedOrg)
        .then(setOrgMetrics)
        .catch((_err) => setError(`Failed to fetch metrics for ${selectedOrg}`));
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedOrg) {
      fetchOrgRepoInsights(selectedOrg)
        .then(setRepoInsights)
        .catch((_err) =>
          setError(`Failed to fetch insights for ${selectedOrg}`)
        );
    }
  }, [selectedOrg]);

  const handleSelectOrg = (orgName: string) => {
    setSelectedOrg(orgName);
    setError(null); // Clear any previous errors when selecting a new org
  };

  return (
    <div className="container mx-auto px-4">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <OrganizationList
            organizations={organizations}
            onSelectOrg={handleSelectOrg}
          />
        </div>
        <div className="md:col-span-2">
          {selectedOrg && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Insights for {selectedOrg}
              </h2>
              {orgMetrics && <ProjectMetrics metrics={orgMetrics} />}
              <h3 className="text-xl font-semibold mt-6 mb-4">
                Repository Insights
              </h3>
              {repoInsights.length > 0 ? (
                repoInsights.map((repo) => (
                  <RepoInsights key={repo.name} insights={repo} />
                ))
              ) : (
                <p>No repository insights available.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
