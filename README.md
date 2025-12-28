# Incogni-Chats 🔐

Incogni-Chats is a modern, secure, and anonymous Q&A platform that allows users to create questions and receive anonymous feedback or answers from others. Built with privacy in mind and a sleek, premium design.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication for user accounts.
- **📝 Anonymous Questions**: Create custom questions and share unique links.
- **🕵️ Private Responses**: Receive feedback and answers anonymously.
- **📊 Personal Dashboard**: Manage all your questions and view responses in one place.
- **🎨 Premium UI/UX**: Modern dark-mode aesthetic with glassmorphism and smooth transitions.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - High-quality icons
- **React Hook Form** - Efficient form handling
- **Axios** - Promise-based HTTP client

### Backend

- **Node.js & Express** - Server-side environment and framework
- **MongoDB & Mongoose** - NoSQL database and ORM
- **JSON Web Tokens (JWT)** - Secure authentication
- **Bcrypt** - Password hashing
- **Cookie Parser** - Cookie-based session management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ddennis18/incogni-chats.git
   cd incogni-chats
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Development Mode**

From the root directory, you can run:

```bash
# Start backend
npm run start --prefix backend

# Start frontend
npm run dev --prefix frontend
```

**Production Build**

To build the entire project (backend serves frontend from `dist`):

```bash
npm run build
npm start
```

## 📂 Project Structure

- `/backend`: Express server, API routes, models, and middleware.
- `/frontend`: React application, components, pages, and styling.

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ by [ddennis18](https://github.com/ddennis18)
