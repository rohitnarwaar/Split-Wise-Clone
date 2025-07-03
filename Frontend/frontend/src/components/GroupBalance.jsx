import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupBalances = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/groups")
      .then(res => setGroups(res.data))
      .catch(err => console.error("❌ Failed to fetch groups:", err));
  }, []);

  const fetchBalances = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/groups/by-name/${selectedGroupName}/balances`);
      setBalances(res.data);
      setError("");
    } catch (err) {
      console.error("❌ Failed to fetch balances:", err);
      setBalances([]);
      setError("Could not fetch balances.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">👥 View Group Balances</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-medium">Group Name</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={selectedGroupName}
            onChange={(e) => setSelectedGroupName(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map(group => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchBalances}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 self-end"
        >
          🔍 Fetch Balances
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {balances.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">💰 Balances:</h3>
          <ul className="space-y-2">
            {balances.map((b, i) => (
              <li key={i} className="border px-4 py-2 rounded bg-gray-50">
                {b.owes} owes {b.to} ₹{b.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupBalances;
