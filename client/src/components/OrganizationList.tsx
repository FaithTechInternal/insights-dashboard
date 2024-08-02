/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationListProps {
  organizations: Organization[];
  onSelectOrg: (orgName: string) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  onSelectOrg,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Organizations</h2>
      <ul className="space-y-2">
        {organizations.map((org) => (
          <li key={org.id}>
            <button
              onClick={() => onSelectOrg(org.name)}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {org.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
