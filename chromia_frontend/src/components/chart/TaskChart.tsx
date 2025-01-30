import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import { FcExpired } from "react-icons/fc";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"]; // Colors for completed, pending, expired

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm">{`Tasks: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

interface TaskData {
  completed: number;
  pending: number;
  expired: number;
}

const TaskChart = ({ data }: { data: TaskData }) => {
  const chartData = [
    { name: "Completed", value: data.completed },
    { name: "Pending", value: data.pending },
    { name: "Expired", value: data.expired },
  ];

  if (data.completed === 0 && data.pending === 0 && data.expired === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg">No tasks available</p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: "100%", 
      height: 300, 
      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 className="text-center text-xl font-bold mb-4 text-gray-800">
        Task Status Distribution
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            animationDuration={1000}
            animationBegin={0}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            formatter={(value) => (
              <span className="flex items-center gap-2 text-sm">
                {value === "Completed" && <IoCheckmarkDoneSharp className="text-green-500" />}
                {value === "Pending" && <SlRefresh className="text-yellow-500" />}
                {value === "Expired" && <FcExpired className="text-red-500" />}
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;