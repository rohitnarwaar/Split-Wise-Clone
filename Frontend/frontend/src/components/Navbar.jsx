import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Plus,
  DollarSign,
  User,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
      isActive ? "bg-teal-600 text-white" : "text-teal-700 hover:bg-teal-100"
    }`;

  return (
    <nav className="bg-white shadow px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xl">
          <DollarSign size={24} />
          <span>Splitwise</span>
        </div>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-teal-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden sm:flex gap-4">
          <NavLink to="/" className={navClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/create-group" className={navClass}>
            <Users size={18} /> Create Group
          </NavLink>
          <NavLink to="/add-expense" className={navClass}>
            <Plus size={18} /> Add Expense
          </NavLink>
          <NavLink to="/group-balances" className={navClass}>
            <DollarSign size={18} /> Group Balances
          </NavLink>
          <NavLink to="/user-balances" className={navClass}>
            <User size={18} /> User Balances
          </NavLink>
        </div>
      </div>

      {/* Mobile nav links */}
      {isOpen && (
        <div className="mt-3 flex flex-col gap-2 sm:hidden">
          <NavLink to="/" className={navClass} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/create-group" className={navClass} onClick={() => setIsOpen(false)}>
            <Users size={18} /> Create Group
          </NavLink>
          <NavLink to="/add-expense" className={navClass} onClick={() => setIsOpen(false)}>
            <Plus size={18} /> Add Expense
          </NavLink>
          <NavLink to="/group-balances" className={navClass} onClick={() => setIsOpen(false)}>
            <DollarSign size={18} /> Group Balances
          </NavLink>
          <NavLink to="/user-balances" className={navClass} onClick={() => setIsOpen(false)}>
            <User size={18} /> User Balances
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
