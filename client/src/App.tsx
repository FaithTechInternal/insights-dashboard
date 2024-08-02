/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import ProjectsDashboard from "./components/ProjectDashboard";
import ImpactDashboard from "./components/ImpactDashboard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">
              FaithTech Create Insights
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Impact Report
              </Link>
              <Link
                to="/projects"
                className="text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Projects Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ImpactDashboard />} />
          <Route path="/projects" element={<ProjectsDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
