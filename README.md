# SpiritX_Team-Spark_01

# SecureConnect - Authentication System

## 📌 Project Overview
SecureConnect is a **secure and user-friendly authentication system** built using the **MERN stack**. It provides a seamless **signup and login experience** with validation, error handling, and session management.

## 🚀 Features
### 🔹 **Signup Page**
- Users can create an account with a **unique username, email, and password**.
- Password must contain:
  - At least **one lowercase letter**
  - At least **one uppercase letter**
  - At least **one special character**
- **Real-time validation** for user input fields.
- **Password strength indicator** updates dynamically based on complexity.
- Confirmation dialog appears after successful signup, redirecting to the login page.

### 🔹 **Login Page**
- Users can **log in** with their username and password.
- **Real-time validation** for incorrect credentials.
- **Session management** keeps users logged in until they log out.
- Users are redirected to the **dashboard** after login.

### 🔹 **Dashboard** (Protected Route)
- Displays a **welcome message** with the username.
- Provides an overview of user **account statistics**.
- Sidebar menu for navigation (Dashboard, Profile, Settings).
- **Logout button** to end the session and redirect to login.

### 🔹 **Security & Session Management**
- Passwords are securely **hashed using bcrypt**.
- **JWT-based authentication** with HTTP-only cookies.
- Protected routes ensure only authenticated users can access the dashboard.

---

## 🛠 Tech Stack
### **Frontend:**
- React (Vite) ⚛️
- Ant Design 🎨 (UI Components)
- Axios (API Calls)

### **Backend:**
- Node.js (Express.js) 🚀
- MongoDB (Mongoose) 🛢
- JSON Web Token (JWT) 🔐
- Bcrypt.js (Password Hashing)

---

## 📂 Folder Structure
```
SecureConnect/
│── backend/         # Express.js Backend
│   ├── models/      # Database Models
│   ├── routes/      # API Routes
│   ├── controllers/ # Business Logic
│   ├── middleware/  # Authentication & Validation
│   ├── config/      # Database Configurations
│   ├── server.js    # Backend Entry Point
│── frontend/        # React + Vite Frontend
│   ├── src/
│   │   ├── api/          # API Calls (Axios)
│   │   ├── components/   # Reusable UI Components
│   │   ├── pages/        # Signup, Login, Dashboard
│   │   ├── context/      # Auth Context for Session
│   │   ├── routes/       # Protected Routes
│   │   ├── App.jsx       # Main App Component
│   │   ├── main.jsx      # Entry Point
│   ├── package.json      # Frontend Dependencies
│── .env                 # Environment Variables
│── README.md            # Documentation
```

---

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/dmisasanka2002/SpiritX_Team-Spark_01.git
cd SecureConnect
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install  # Install dependencies
```
Create a `.env` file in the `backend/` folder and add:
```env
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/yourDatabase
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```sh
npm run dev
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install  # Install dependencies
```
Start the frontend:
```sh
npm run dev
```
Here Set the "API_URL" of src/api/auth.js to your backend url + api/auth.
Ex : const API_URL = "http://localhost:5000/api/auth";

---

## 🔥 API Endpoints
### **🔹 Authentication Routes** (`/api/auth`)
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | `/signup`  | Registers a new user |
| POST   | `/login`   | Authenticates a user |
| POST   | `/logout`  | Logs out the user |

---

## 🛡 Security Measures
- **Password Hashing:** Bcrypt.js for secure password storage.
- **JWT Authentication:** Tokens used for secure access.
- **HTTP-Only Cookies:** Prevent XSS attacks.
- **Protected Routes:** Dashboard is accessible only when logged in.

---

## 🏆 Future Enhancements
- Google & GitHub OAuth Integration 🌍
- Dark Mode Support 🌙
- Email Verification System ✉️

---

## 📜 License
This project is licensed under the **MIT License**.

### 🎉 Happy Coding! 🚀

