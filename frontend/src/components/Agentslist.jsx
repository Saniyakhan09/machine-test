
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  // Fetch all agents
  useEffect(() => {
    fetch("http://localhost:3000/agent/all")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0E1221] text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav className="space-y-3">
          <button
            onClick={() => navigate("/Addagent")}
            className="hover:text-[#5a3450] cursor-pointer"
          >
            Create Agents
          </button>
          <br />
          <button
            onClick={() => navigate("/Agentlist")}
            className="hover:text-[#5a3450] cursor-pointer"
          >
            Agents
          </button>
          <br />
          <button
            onClick={() => navigate("/Distributionlist")}
            className="hover:text-[#5a3450] cursor-pointer"
          >
            Upload List
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-6 pt-20  pr-4 w-full">
        <div className="overflow-x-auto">
      
<h1 className="flex items-center justify-center  uppercase font-medium text-2xl mb-10 ">
  agent <span className="font-extrabold  uppercase ml-1">List</span>
</h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#0E1221] text-white text-left">
                <th className="py-3 px-4 border-b w-16">#</th>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Mobile</th>
              </tr>
            </thead>

            <tbody>
              {agents.length > 0 ? (
                agents.map((agent, index) => (
                  <tr key={agent._id} className="hover:bg-gray-100">
                    <td className="py-5 px-4 border-b text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-5 px-4 border-b">{agent.name}</td>
                    <td className="py-5 px-4 border-b">{agent.email}</td>
                    <td className="py-5 px-4 border-b">{agent.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-5 text-gray-500 italic"
                  >
                    No agents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
