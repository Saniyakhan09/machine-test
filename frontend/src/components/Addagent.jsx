// Addagent Component
// Creating new agents (name, email, phone, password)
// Uses react-phone-input-2 for country code phone input
// Submits agent data to backend (POST /agent/add)
// Displays success or error messages based on API response
// Uses React Router to navigate between different dashboard sections.
// Includes sidebar navigation for Dashboard pages:
// .Create Agents
// .Agents
// . Upload List
// . Redirects between dashboard sections using React Router

import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom"; 

import PhoneInput from "react-phone-input-2";

// State for storing form input values
const Addagent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  // Handles phone input changes from react-phone-input-2

  const handlePhoneChange = (value , country, e, formattedValue) => {

    // setMobile(value);
    console.log("Phone input value:", formattedValue);
      setFormData((prev) => ({ ...prev, mobile: formattedValue }));

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
const cleanedMobile = formData.mobile.replace(/\s|-/g, ''); 
    try {
      const res = await fetch("http://localhost:3000/agent/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mobile: cleanedMobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Agent added successfully!");
        console.log("Submitting formData:", formData);

        setFormData({ name: "", email: "", mobile: "", password: "" });
      } else {
        setMessage(` ${data.message || "Failed to add agent"}`);
      }
    } catch (err) {
      setMessage(" Server error. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0E1221]  text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav   className="space-y-3">
            <button onClick={()=>{navigate("/Addagent")}} className="hover:text-[#5a3450] cursor-pointer">
                      
 Create Agents</button>
 <br />
    <button onClick={()=>{navigate("/Agentlist")}} className="hover:text-[#5a3450] cursor-pointer">
                      
 Agents</button>
            <br />
            <button   onClick={()=>{navigate("/Distributionlist")}} className="hover:text-[#5a3450] cursor-pointer">Upload List</button>
            
          
        </nav>
      </aside>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl  p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Create an Agent
          </h1>

          {/*Agents Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#5a3450] focus:outline-none"
              placeholder="Enter agent name"
              required
            />
          </div>

          {/*Agents Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#5a3450] focus:outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              {/* Mobile with country code */}
            </label>
        <PhoneInput
        country={"in"} 
        value={formData.mobile}
        onChange={handlePhoneChange}
        inputStyle={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          height: "40px",
        }}
        buttonStyle={{
          border: "1px solid #d1d5db",
        }}
      />
          
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#5a3450] focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {/*submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0E1221] hover:bg-[#5a3450] text-white py-2 rounded-lg transition-all duration-200"
          >
            Add Agent
          </button>

          {/* Message */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </form>
      </main>
    </div>
  );
};

export default Addagent;
