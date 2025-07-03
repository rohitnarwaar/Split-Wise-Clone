import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExpense = () => {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/groups")
      .then((res) => setGroups(res.data))
      .catch((err) => {
        console.error("❌ Failed to fetch groups:", err);
        setError("❌ Failed to load groups.");
      });
  }, []);

  useEffect(() => {
    if (groupId) {
      const selectedGroup = groups.find((g) => g.id === parseInt(groupId));
      setSelectedGroupMembers(selectedGroup?.members || []);
    } else {
      setSelectedGroupMembers([]);
    }
  }, [groupId, groups]);

  const handleSubmit = async () => {
    try {
      if (!groupId || !paidBy || !amount || !description) {
        setError("❌ Please fill all fields.");
        return;
      }

      const payload = {
        description,
        amount: parseFloat(amount),
        paid_by: parseInt(paidBy),
        split_type: splitType,
      };

      // Optional: Handle percentage split
      if (splitType === "percentage") {
        payload.splits = selectedGroupMembers.map((m) => ({
          user_id: m.id,
          amount: parseFloat(amount) / selectedGroupMembers.length,
        }));
      }

      console.log("📦 Sending:", payload);

      await axios.post(`http://localhost:8000/groups/${groupId}/expenses`, payload);

      setSuccess("✅ Expense added successfully!");
      setError("");
      setAmount("");
      setDescription("");
      setPaidBy("");
      setGroupId("");
    } catch (err) {
      console.error("❌ Error adding expense:", err);
      setError("❌ Failed to add expense.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">➕ Add New Expense</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-medium">Group</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this expense for?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-medium">Paid By</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            <option value="">Select Member</option>
            {selectedGroupMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Split Method</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
          >
            <option value="equal">Split Equally</option>
            <option value="percentage">Split by Percentage</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        + Add Expense
      </button>

      {success && <p className="text-green-600 mt-4">{success}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default AddExpense;
