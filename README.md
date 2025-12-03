# 🌟 Rating App - Full Stack Application

> **Professional Rating Management System for Company Assignment**

---

## 🎯 **PROJECT OVERVIEW**

A comprehensive full-stack web application for managing store ratings with role-based access control, featuring modern design, smooth animations, and professional UI/UX.

---

## 🛠️ **TECH STACK**

### **Frontend**
- React 19 + Vite 7
- Tailwind CSS 4
- Framer Motion (Animations)
- React Router
- React Hook Form
- Axios
- React Toastify

### **Backend**
- Node.js + Express.js 5
- Sequelize ORM
- MySQL 2
- JWT Authentication
- Bcrypt Password Hashing
- Joi Validation

### **Database**
- MySQL

---

## 🚀 **SETUP INSTRUCTIONS**

### **Prerequisites**
- Node.js v16+
- MySQL v8+

### **1. Database Setup**

Create MySQL database:
```sql
CREATE DATABASE rating_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Configure .env file (update DB_PASS if needed)
# Default .env is already created with:
# DB_USER=root, DB_PASS=, DB_NAME=rating_app

# Start backend server
npm run dev
```

Server runs on: `http://localhost:5000`

### **3. Create Admin User**

Open a new terminal:
```bash
cd backend
node createAdmin.js
```

This creates admin user:
- **Email**: admin@gmail.com
- **Password**: Admin@123

### **4. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### **5. Access Application**

Open browser: `http://localhost:5173`

**Login as Admin:**
- Email: admin@gmail.com
- Password: Admin@123

---

## ✨ **FEATURES**

### 🔐 **System Administrator**
- Dashboard with statistics (Users, Stores, Ratings)
- User management (Create, View, Filter by role/name/email)
- Store management (Create, View, Assign owners)
- Advanced filtering and search
- Beautiful data visualization

### 🏪 **Store Owner**
- Personal dashboard with store performance
- View customer ratings and feedback
- Average rating display
- Customer details

### 👤 **Normal User**
- User registration
- Browse and search stores
- Submit 1-5 star ratings
- Update existing ratings
- View overall store ratings

### 🎨 **Design Features**
- Modern glassmorphism effects
- Smooth Framer Motion animations
- Responsive design
- Premium gradient backgrounds
- Micro-interactions
- Professional footer
- 60 FPS performance

---

## 🔒 **SECURITY**

- JWT authentication
- Bcrypt password hashing
- Input validation (client & server)
- Role-based access control
- SQL injection prevention

---

## ✅ **FORM VALIDATIONS**

- **Name**: 20-60 characters
- **Email**: Valid email format
- **Password**: 8-16 characters, 1 uppercase, 1 special character (!@#$%^&*)
- **Address**: Maximum 400 characters

---

## 📊 **DATABASE SCHEMA**

### **Users Table**
- id, name, email, password (hashed), address, role, createdAt, updatedAt
- Roles: admin, normal_user, store_owner

### **Stores Table**
- id, name, email, address, rating (average), ownerId, createdAt, updatedAt

### **Ratings Table**
- id, rating (1-5), userId, storeId, createdAt, updatedAt

---

## 🔄 **API ENDPOINTS**

### **Authentication**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `PUT /api/auth/change-password` - Update password

### **Admin (Protected)**
- `GET /api/admin/dashboard` - Statistics
- `GET /api/admin/users` - List users with filters
- `POST /api/admin/users` - Create user
- `GET /api/admin/stores` - List stores
- `POST /api/admin/stores` - Create store

### **Stores**
- `GET /api/stores` - List all stores
- `POST /api/stores/rate` - Submit rating
- `GET /api/stores/my-store` - Store owner dashboard

---

## 📁 **PROJECT STRUCTURE**

```
rating-app/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── createAdmin.js   # Create admin user
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   └── package.json
│
└── README.md
```

---

## 🧪 **TESTING THE APPLICATION**

### **Test as Admin:**
1. Login: admin@gmail.com / Admin@123
2. View dashboard statistics
3. Create new users (all roles)
4. Create stores and assign owners
5. Filter users/stores

### **Test as Normal User:**
1. Click "Sign Up"
2. Register (name 20+ chars, password with uppercase + special char)
3. Browse stores
4. Submit ratings (1-5 stars)
5. Update your ratings

### **Test as Store Owner:**
1. Login as admin
2. Create store owner user
3. Create store and assign to owner
4. Logout and login as store owner
5. View ratings dashboard

---

## 🎨 **UI/UX HIGHLIGHTS**

- Beautiful landing page with animations
- Glassmorphism cards
- Smooth page transitions
- Interactive rating system
- Real-time form validation
- Professional footer
- Responsive design
- Loading states
- Error handling

---

## 🐛 **TROUBLESHOOTING**

### **Backend won't start:**
- Ensure MySQL is running
- Check database `rating_app` exists
- Verify .env credentials

### **Can't login:**
- Run `node createAdmin.js` to create admin user
- Use: admin@gmail.com / Admin@123

### **Frontend can't connect:**
- Ensure backend is running on port 5000
- Check for CORS errors in console

---

## 📞 **SUPPORT**

Check that:
- MySQL server is running
- Both backend and frontend servers are running
- Database `rating_app` exists
- Admin user is created

---
