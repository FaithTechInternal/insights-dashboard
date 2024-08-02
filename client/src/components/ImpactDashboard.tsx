/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface DataPoint {
  month: string;
  activeBuilders: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface ProjectMetric {
  name: string;
  value: number;
}

interface ChartProps {
  data: DataPoint[] | CategoryData[] | ProjectMetric[];
}

interface ImpactStoriesProps {
  stories: string[];
}

const ActiveBuildersChart: React.FC<ChartProps> = ({ data }) => (
  <Card className="w-full h-[300px]">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">
        Active Builders Over Time
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data as DataPoint[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activeBuilders" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const ProjectCategoryChart: React.FC<ChartProps> = ({ data }) => (
  <Card className="w-full h-[300px]">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">
        Project Breakdown by Category
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data as CategoryData[]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {(data as CategoryData[]).map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const ProjectMetricsChart: React.FC<ChartProps> = ({ data }) => (
  <Card className="w-full h-[300px]">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">Project Metrics</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data as ProjectMetric[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const ImpactStories: React.FC<ImpactStoriesProps> = ({ stories }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">
        Recent Impact Stories
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5">
        {stories.map((story, index) => (
          <li key={index} className="mb-2 text-sm">
            {story}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const ImpactDashboard: React.FC = () => {
  // Sample data - replace with actual data from your backend
  const activeBuildersData: DataPoint[] = [
    { month: "Jan", activeBuilders: 120 },
    { month: "Feb", activeBuilders: 150 },
    { month: "Mar", activeBuilders: 180 },
    { month: "Apr", activeBuilders: 200 },
  ];

  const projectCategoryData: CategoryData[] = [
    { name: "Marginalized", value: 35 },
    { name: "Evangelism", value: 40 },
    { name: "Local Church", value: 25 },
  ];

  const projectMetricsData: ProjectMetric[] = [
    { name: "Active Projects", value: 25 },
    { name: "Deployed Projects", value: 15 },
    { name: "Startup Transitions", value: 5 },
  ];

  const impactStories: string[] = [
    "Our project helped 100 homeless individuals find shelter last month.",
    "A new app developed by our team has reached 10,000 downloads, sharing the gospel daily.",
    "Local church attendance increased by 15% after implementing our community engagement platform.",
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Impact Report
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveBuildersChart data={activeBuildersData} />
        <ProjectCategoryChart data={projectCategoryData} />
        <ProjectMetricsChart data={projectMetricsData} />
        <ImpactStories stories={impactStories} />
      </div>
    </div>
  );
};

export default ImpactDashboard;
