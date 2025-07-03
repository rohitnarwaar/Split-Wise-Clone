import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateGroup from "./pages/CreateGroup";
import AddExpense from "./pages/AddExpense";
import GroupBalances from "./pages/GroupBalances";
import UserBalances from "./pages/UserBalances";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/group-balances" element={<GroupBalances />} />
        <Route path="/user-balances" element={<UserBalances />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
