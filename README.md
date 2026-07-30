# 🚀 Smart Queue Management System API

A RESTful backend API for managing customer queues in service-oriented environments such as banks, hospitals, restaurants, government offices, and customer support centers.

The API provides secure authentication, role-based authorization, queue management, customer tracking, and administrative controls using Node.js, Express, MongoDB, and JWT.

---

## 📌 Table of Contents

- Project Overview
- Features
- Technologies Used
- Architecture
- Project Structure
- Installation
- Environment Variables
- API Endpoints
- Authentication
- Role-Based Access Control
- Error Handling
- Future Improvements
- Author
- License

---

# 📖 Project Overview

Traditional queue systems rely heavily on manual processes, making it difficult to monitor customer positions and efficiently serve waiting customers.

The Smart Queue Management System digitizes the queue process by allowing customers to:

- Register
- Login securely
- Join a queue
- Check their queue position

Administrators can:

- View all waiting customers
- Call the next customer
- Mark customers as served
- View queue statistics

---

# ✨ Features

## Authentication

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Authentication

## Customer

- View Profile
- Join Queue
- View Queue Position

## Admin

- View Waiting Queue
- Call Next Customer
- Mark Customer as Served
- Queue Statistics

## Security

- JWT Authentication
- Role-Based Access Control
- Request Validation using Joi
- Password Hashing

---

# 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Joi
- dotenv
- Nodemon

---

# 🏗 Architecture

The project follows the MVC (Model-View-Controller) architecture with a Service Layer.

```
Client
   │
Routes
   │
Controllers
   │
Services
   │
Models
   │
MongoDB Atlas
```

Business logic is separated from controllers using dedicated service files to improve maintainability and scalability.

---

# 📂 Project Structure

```text
smart_queue_management_system/

config/
controllers/
middleware/
models/
routes/
services/
validators/

app.js
server.js
package.json
README.md
.env.example
```

---

# ⚙ Installation

## Clone the Repository

```bash
git clone <repository-url>
```

## Navigate into the project

```bash
cd smart_queue_management_system
```

## Install dependencies

```bash
npm install
```

## Create a .env file

Copy the variables from:

```text
.example.env
```

Rename it to:

```text
.env
```

## Start the Development Server

```bash
npm run dev
```

The server runs on:

```
http://localhost:3005
```

---

# 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGO_URI | MongoDB Atlas Connection String |
| JWT_SECRET | JWT Secret Key |

---

# 🔑 Authentication

All protected routes require a Bearer Token.

Example:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 👥 Role-Based Access Control

## Customer

- View Profile
- Join Queue
- View Queue Position

## Admin

- View Waiting Queue
- Call Next Customer
- Mark Customer as Served
- View Queue Statistics

---

# ❌ Error Handling

The API returns consistent JSON responses.

Example:

```json
{
    "success": false,
    "message": "Validation failed"
}
```

---

# 🚀 Future Improvements

- Email Notifications
- SMS Notifications
- Push Notifications
- Swagger Documentation
- Docker Support
- Unit & Integration Testing
- WebSocket Real-Time Queue Updates
- Queue Reservation
- Estimated Waiting Time

---

# 👨‍💻 Author

**Elias Ademu Israel**

Backend Developer

GitHub: https://github.com/Elias768-collab

LinkedIn: https://www.linkedin.com/in/israel-ademu-elias-0b9b93389

---

# 📄 License

This project is licensed under the MIT License.