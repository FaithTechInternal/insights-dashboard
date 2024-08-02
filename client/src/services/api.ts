/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchOrganizations = async () => {
  const response = await api.get("/github/organizations");
  return response.data;
};

export const fetchOrgMetrics = async (orgName: string) => {
  const response = await api.get(`/insights/org/${orgName}`);
  return response.data;
};

export const fetchOrgRepoInsights = async (orgName: string) => {
  const response = await api.get(`/insights/org/${orgName}/repos`);
  return response.data;
};

export const fetchRepoInsights = async (orgName: string, repoName: string) => {
  const response = await api.get(`/insights/repo/${orgName}/${repoName}`);
  return response.data;
};

export default api;
