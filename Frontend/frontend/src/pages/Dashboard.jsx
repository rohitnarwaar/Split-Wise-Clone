import React from "react";
import { Link } from "react-router-dom";
import { Users, Plus, DollarSign, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">Splitwise</h1>
      <p className="text-gray-600 mt-1 mb-5 text-md sm:text-lg">
        Manage groups, expenses, and balances easily.
      </p>

      {/* Top CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8">
        <Link
          to="/create-group"
          className="bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 w-full sm:w-auto text-center"
        >
          👥 Create Group
        </Link>
        <Link
          to="/add-expense"
          className="border border-teal-600 text-teal-700 px-5 py-2 rounded hover:bg-teal-100 w-full sm:w-auto text-center"
        >
          ➕ Add Expense
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        <Link
          to="/create-group"
          className="bg-white p-5 rounded shadow hover:shadow-md transition"
        >
          <Users className="mx-auto mb-2 text-teal-600" size={32} />
          <p className="text-lg font-semibold">Create Group</p>
        </Link>

        <Link
          to="/add-expense"
          className="bg-white p-5 rounded shadow hover:shadow-md transition"
        >
          <Plus className="mx-auto mb-2 text-teal-600" size={32} />
          <p className="text-lg font-semibold">Add Expense</p>
        </Link>

        <Link
          to="/group-balances"
          className="bg-white p-5 rounded shadow hover:shadow-md transition"
        >
          <DollarSign className="mx-auto mb-2 text-teal-600" size={32} />
          <p className="text-lg font-semibold">Group Balances</p>
        </Link>

        <Link
          to="/user-balances"
          className="bg-white p-5 rounded shadow hover:shadow-md transition"
        >
          <User className="mx-auto mb-2 text-teal-600" size={32} />
          <p className="text-lg font-semibold">User Balances</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
