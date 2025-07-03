import React, { useState } from "react";
import axios from "axios";
import { Users, X, Plus } from "lucide-react";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddMember = () => {
    const trimmed = memberInput.trim();
    if (trimmed && !members.includes(trimmed)) {
      setMembers([...members, trimmed]);
      setMemberInput("");
    }
  };

  const handleRemoveMember = (name) => {
    setMembers(members.filter((m) => m !== name));
  };

  const handleSubmit = async () => {
    if (!groupName || members.length === 0) {
      setError("Please enter a group name and at least one member.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/groups", {
        name: groupName,
        members,
      });
      setSuccess("✅ Group created successfully!");
      setError("");
      setGroupName("");
      setMembers([]);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to create group. Try again.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow p-6 sm:p-8">
        <div className="text-teal-600 flex justify-center mb-4">
          <Users size={40} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Create a New Group</h2>

        {/* Group Name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
        <input
          type="text"
          placeholder="Weekend Trip"
          className="w-full px-4 py-2 border rounded mb-4"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        {/* Add Members */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Add Members</label>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter name"
            className="flex-grow px-4 py-2 border border-teal-500 rounded"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
          />
          <button
            onClick={handleAddMember}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Members List */}
        {members.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {members.map((m, i) => (
              <span
                key={i}
                className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
              >
                {m}
                <button onClick={() => handleRemoveMember(m)} className="ml-2">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            members.length && groupName
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-teal-300 cursor-not-allowed"
          }`}
          disabled={!groupName || members.length === 0}
        >
          Create Group
        </button>

        {/* Feedback */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default GroupForm;
