
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Distributionlist = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [distributedData, setDistributedData] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file first");

    const formData = new FormData();
    formData.append("data", file);

// fetching the data to upload files
    try {
      const res = await fetch("http://localhost:3000/list/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setDistributedData(data.data);
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0E1221] text-white p-6 fixed h-full">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-4">
             <button onClick={()=>{navigate("/Addagent")}} className="hover:text-[#5a3450] cursor-pointer">
                      
 Create Agents</button>
 <br />
          <button
            onClick={() => navigate("/Agentlist")}
            className="block w-full text-left hover:text-[#5a3450] cursor-pointer"
          >
            Agents
          </button>
          <button
            onClick={() => navigate("/Distributionlist")}
            className="block w-full text-left hover:text-[#5a3450] cursor-pointer"
          >
            Upload List
          </button>
         
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-[40vw] p-10 pt-20 w-full">
        <h1 className="text-2xl ml-12 font-bold mb-6 text-gray-900 uppercase">Upload csv, xlsx and axls</h1>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="bg-white p-6  shadow rounded w-full max-w-md">
         
<div className="mb-4 flex items-center gap-4">
            <label className="w-full">
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center justify-between w-full border border-[#0E1221] rounded px-4 py-2">
                <span className="text-gray-500">{file ? file.name : "No file chosen"}</span>
                {/* browser button */}
                <button
                  type="button"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  className="bg-[#0E1221] text-white rounded px-6 py-1  hover:bg-[#1b1f33]"
                >
                  Browse
                </button>
              </div>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#0E1221] text-white px-4 py-2 rounded w-full hover:bg-[#1b1f33]"
          >
            Upload
          </button>
        </form>

        {/* Message */}
        {message && <p className="mt-4 ml-20 text-gray-700">{message}</p>}

        {/* Show distributed data */}

{distributedData.length > 0 && (
<div className="mt-24   mx-auto">
    {/* 👇 Add your heading here */}
    <h2 className="text-2xl font-bold  text-center -ml-90 text-gray-900 underline -mb-10 uppercase">
      Distributed Lists
    </h2>
  <div className="mt-24 -ml-60   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8  w-[120%] mx-auto">
    {/* maping the agents data  */}
     
    {distributedData.map((agent, i) => (

      <div
        key={i}
        className=" p-6 w-2xs gap-4 shadow-lg rounded-2xl border border-[#0E1221] hover:shadow-xl transition-all duration-300"
      >
        <h2 className="text-xl font-semibold text-[#0E1221] mb-4">
          Agent: {agent.agentName}
        </h2>

        <div className="space-y-4">
          {agent.data.map((task, index) => (
            <div
              key={index}
              className="border   border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all"
            >
              <p className="text-sm font-medium text-gray-800">
                Name: <span className="font-normal">{task.name}</span>
              </p>
              <p className="text-sm font-medium text-gray-800">
                Phone:{" "}
                <span className="font-normal">{task["phone number"]}</span>
              </p>
              <p className="text-sm text-gray-600">
                Notes: <span className="font-normal">{task.notes}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  </div>
)}



      </div>
    </div>
  );
};

export default Distributionlist;