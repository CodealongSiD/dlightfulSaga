# Indie Fiction Bookstore

A full-stack MERN application for discovering, browsing, and purchasing indie fiction books.  
The platform allows users to explore book listings, manage their cart, securely checkout with payment integration, and manage their profile.

---

## Table of Contents
1. Features
2. Tech Stack
3. Project Structure
4. Frontend Overview
5. Backend Overview
6. Installation & Setup
7. Environment Variables
8. Deployment
9. API Endpoints
10. Developer Notes
11. License

---

## Features

### Frontend
- Responsive design (mobile-first)
- Product listing page with filtering and sorting
- Product details page
- Add to cart, update quantity, remove items
- User authentication (login, signup, JWT-based auth)
- Profile management
- Checkout flow with payment integration
- Custom 404 page with themed UI/UX
- Persistent cart and user session

### Backend
- RESTful API with Express.js
- JWT authentication and middleware for protected routes
- MongoDB models for Users, Products, Orders
- Cart management API endpoints
- Order creation and payment verification
- Secure password hashing with bcrypt
- Centralized error handling middleware

---

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt.js

**Payment Integration:**
- Razorpay

**Deployment:**
- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── AppRoutes.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Frontend Overview

### Key Pages
- `/` — Hero section, CTA to browse books
- `/products` — Product listing page with sorting/filtering
- `/product/:id` — Product details page
- `/cart` — Shopping cart
- `/checkout` — Checkout process
- `/profile` — User profile & order history
- `*` — 404 page

### State Management
- Context API for Auth, Cart, and other shared state
- LocalStorage persistence for user session and cart

### Styling
- Tailwind CSS for utility-first responsive styling
- Custom fonts for branding consistency

---

## Backend Overview

### Models
- **User**: name, email, password, role
- **Product**: title, author, price, description, stock
- **Order**: user reference, products, total price, payment status

### Routes
- **Auth**: `/signup`, `/login`, `/forgot-password`, `/reset-password/:token`, `/protected`
- **Products**: GET list, GET single, admin CRUD
- **Cart**: Add, update, remove
- **Orders**: Create order, verify payment, fetch order history

### Middleware
- `requireAuth` — validates JWT
- `errorHandler` — centralized error handling

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

### 2. Install Dependencies
**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

### 3. Environment Variables
Create `.env` files in both **frontend** and **backend** folders (see Environment Variables section).

### 4. Run Locally

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd frontend
npm run dev
```

---

## Environment Variables

### Frontend
```
VITE_BACKEND_URL=http://localhost:5000/api
```

### Backend
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## Deployment

### Backend (Render)
1. Push backend code to GitHub
2. Create a new Web Service in Render
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push frontend code to GitHub
2. Import to Vercel/Netlify
3. Set environment variable:
```
VITE_BACKEND_URL=https://yourbackend.onrender.com/api
```
4. Deploy

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/forgot-password` | Send reset email | No |
| POST | `/auth/reset-password/:token` | Reset password | No |
| GET  | `/products` | Get all products | No |
| GET  | `/products/:id` | Get single product | No |
| POST | `/cart` | Add to cart | Yes |
| PUT  | `/cart/:id` | Update cart item | Yes |
| DELETE | `/cart/:id` | Remove from cart | Yes |
| POST | `/orders` | Create new order | Yes |
| POST | `/orders/verify` | Verify payment | Yes |
| GET | `/orders` | Get user orders | Yes |

---

## Developer Notes

- **Routing**:  
  All main routes are handled by `AppRoutes.jsx` in the frontend.  
  Any unmatched route is redirected to a custom 404 page styled with a themed gradient background and Lego Batman-inspired messaging.

- **404 Page UX**:  
  Uses a single animated GIF for modern design best practices.  
  First paragraph informs the user the page is missing, styled in-character with the Batman universe.  
  CTA button returns the user to the homepage.

- **API Calls**:  
  All HTTP requests use a centralized `axiosInstance` with `baseURL` set via environment variables.  
  Example:
  ```javascript
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  ```

- **Auth Handling**:  
  JWT tokens are stored in localStorage and validated on page load by hitting `/auth/me`.  
  If the token is invalid or expired, the user is logged out automatically.

- **State Management**:  
  Context API is used for authentication, cart state, and other global data.  
  This ensures predictable state updates and easier maintainability.

- **Styling**:  
  Tailwind CSS utilities are used for consistency and responsiveness.  
  Some components use custom class overrides for branding.

---

## License
This project is licensed under the MIT License.
