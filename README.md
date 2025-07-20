# 💸 FairSplit – Full-Stack Expense Sharing App

**FairSplit** is a full-stack, responsive expense management web app inspired by Splitwise. Built with **React**, **Tailwind CSS**, and **FastAPI**, it allows users to **create groups**, **log and split expenses**, and **view real-time balances**. It also includes a built-in **AI chatbot** powered by **Gemini AI** to answer natural language queries about your expenses.

---

## 🚀 Features

- ✅ Create and manage groups
- ✅ Add expenses with **equal** or **percentage** splits
- ✅ View simplified **group balances**
- ✅ Check **individual user balances**
- ✅ Ask questions using **AI-powered chatbot** (e.g., “total expense in Ladakh trip”)
- ✅ Responsive, modern UI with **Tailwind CSS**
- ✅ RESTful API architecture using **FastAPI**

---

## 🧠 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| Frontend     | React, Tailwind CSS, React Router, Axios, Lucide Icons |
| Backend      | FastAPI, SQLAlchemy, Pydantic |
| Database     | PostgreSQL (configurable via `.env`) |
| AI Assistant | Google Gemini API (`google.generativeai`) |
| Deployment   | Locally on `localhost:3000` and `localhost:8000` |

---

## 📸 Screenshots

| Dashboard | Create Group | Add Expense |
|----------|--------------|-------------|
| ![Dashboard](./assets/dashboard.png) | ![Create Group](./assets/create-group.png) | ![Add Expense](./assets/add-expense.png) |

| Group Balances | User Balances | Chatbot |
|----------------|---------------|---------|
| ![Group Balances](./assets/group-balances.png) | ![User Balances](./assets/user-balances.png) | ![Chatbot](./assets/chatbot.png) |

> 📁 Place screenshots in an `assets/` folder in your repo.

---

## 📁 Project Structure

FairSplit/
├── Backend/
│ └── app/
│ ├── main.py # FastAPI entrypoint
│ ├── chat.py # Gemini AI integration
│ ├── crud.py # DB operations
│ ├── models.py # SQLAlchemy models
│ ├── schemas.py # Pydantic schemas
│ ├── utils.py # Splitting & balance logic
│ └── database.py # PostgreSQL connection
├── Frontend/
│ └── frontend/
│ ├── src/
│ │ ├── components/ # Chatbot, Navbar, Forms
│ │ ├── pages/ # Dashboard, Views
│ │ ├── App.js
│ │ └── index.js
├── .env # Env vars for DB and API
└── README.md

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js (v18+)
- Python (3.9+)
- PostgreSQL
- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))

---

### 🖥 Backend Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
Create a .env file:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/fairsplit
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```
## 🌐 Frontend Setup

```bash
cd Frontend/frontend
npm install
npm start
```
Visit: http://localhost:3000

## 🤖 Chatbot Endpoint
```bash
{
  "query": "total expense in Ladakh trip"
}
```

Returns a contextual reply using Gemini AI with relevant group data.

## 💼 Contribution / Resume Highlight
Developed a full-stack expense tracker using React, Tailwind, FastAPI, and PostgreSQL. Implemented group creation, dynamic expense splitting (equal/percentage), AI-powered chatbot with Gemini API, and optimized balance simplification logic.

## 
📚 Learning Outcomes
REST API design and DB modeling

React component structure & routing

Tailwind for responsive UI

Python backend with FastAPI

Integrating Google Gemini API

Full-stack application lifecycle

## 🙌 Acknowledgments
Splitwise for conceptual inspiration

Google Gemini AI for AI integration

Lucide Icons for UI components

## 🛠 Future Improvements
🔐 Add login/authentication

🌍 Multi-currency & conversion

📤 Email notifications for balances

🚀 Deploy on Render, Vercel or Netlify
