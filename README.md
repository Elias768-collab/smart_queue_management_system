# Smart Queue Management System API

A RESTful backend API for managing customer queues in service-oriented environments.

## Live API

**Production API:**

https://smart-queue-management-system-buyz.onrender.com

**Welcome Endpoint:**

http
GET https://smart-queue-management-system-buyz.onrender.com/


Example response:

json
{
  "success": true,
  "message": "Welcome to the Smart Queue Management System API"
}

## Table of Contents

- Project Overview
- MVP Scope
- Features
- Technology Stack
- Architecture
- Project Structure
- Authentication
- Role-Based Access Control
- API Endpoints
- Typical Customer Workflow
- Typical Admin Workflow
- Response Format
- HTTP Status Codes
- Environment Variables
- Local Development
- Production Deployment
- Queue Business Rules
- Security Considerations
- Testing
- Known MVP Limitations
- Planned Enhancements
- Repository
- Author

## Project Overview

The Smart Queue Management System is a RESTful backend API designed to digitize and manage customer queues in service-oriented environments such as banks, hospitals, restaurants, government offices, and customer service centers.

The system allows customers to register, authenticate, join a queue, and monitor their current position.

Administrators can manage the waiting queue, call the next customer, mark customers as served, and view queue statistics.

The project was developed using a layered architecture with controllers, services, middleware, routes, and database models.

## MVP Scope

The current MVP focuses on the complete core queue-management workflow:

Register
   ↓
Login
   ↓
Join Queue
   ↓
Check Queue Position
   ↓
Admin Views Waiting Queue
   ↓
Admin Calls Next Customer
   ↓
Customer Is Served


The MVP has been deployed to Render and uses MongoDB Atlas as the production database.

## Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Configurable JWT expiration
- Protected API routes

### Customer Features

Customers can:

- Register an account
- Login
- View their profile
- Join the waiting queue
- Check their current queue position
- Receive protection against multiple active queue entries

### Administrator Features

Administrators can:

- View waiting customers
- View queue statistics
- Call the next customer
- Mark the currently serving customer as served

### Validation and Security

The API includes:

- JWT authentication middleware
- Role-based access control
- Admin-only route protection
- Request validation using Joi
- Password hashing
- Environment-based configuration
- Consistent API response structures

## Technology Stack

  Technology           | Purpose 

 Node.js              | JavaScript runtime 
 Express.js           | REST API framework 
 MongoDB Atlas        | Cloud database 
 Mongoose             | MongoDB object modeling 
 JSON Web Token (JWT) | Authentication 
 bcrypt               | Password hashing 
 Joi                  | Request validation 
 dotenv               | Environment configuration 
 Nodemon              | Local development 
 Render               | Production deployment 
 Postman              | API testing 

## Architecture

The application follows an MVC-style architecture with a dedicated service layer.

Client / Postman
       │
       ▼
     Routes
       │
       ▼
   Middleware
       │
       ▼
   Controllers
       │
       ▼
    Services
       │
       ▼
     Models
       │
       ▼
 MongoDB Atlas

### Layer Responsibilities

**Routes**

Define API endpoints and connect requests to middleware and controllers.

**Middleware**

Handles authentication, authorization, and request validation.

**Controllers**

Handle HTTP requests and return appropriate HTTP responses.

**Services**

Contain the application's business logic, such as queue creation, queue position calculation, and queue status transitions.

**Models**

Define the MongoDB data structures using Mongoose.

## Project Structure

smart_queue_management_system/
│
├── config/
│
├── controllers/
│   ├── authController.js
│   ├── queueController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── validationMiddleware.js
│
├── models/
│   ├── queueModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── queueRoutes.js
│   └── userRoutes.js
│
├── services/
│   ├── authServices.js
│   ├── queueServices.js
│   └── userServices.js
│
├── validators/
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
The exact contents of individual folders may evolve as the project moves beyond the MVP stage.

## Authentication

Protected endpoints require a valid JWT.

Add the token to the request header:

 http
Authorization: Bearer YOUR_JWT_TOKEN

The authentication middleware verifies the JWT before allowing access to protected endpoints.

The authenticated user's information is attached to the request and used by protected controllers and services.

## Role-Based Access Control

The system currently supports two main roles:

### Customer

Customers can:

- View their profile
- Join the queue
- View their queue position

### Admin

Administrators can:

- View the waiting queue
- View queue statistics
- Call the next customer
- Mark customers as served

Administrative operations are protected by the `isAdmin` middleware.

This prevents ordinary customers from accessing administrative queue-management operations.

### Role Assignment

New users registered through:

 http
POST /api/auth/register


are assigned the application's default customer role.

During the MVP/testing stage, a user's role can be changed to `admin` through the database.

A dedicated administrator management workflow is planned as a future enhancement.


# API Endpoints

The production base URL is:
https://smart-queue-management-system-buyz.onrender.com

## General

 Method | Endpoint | Authentication | Description 

 GET    | `/`      | No             | Welcome/health response 

### Welcome

  http
GET /


Production URL:
https://smart-queue-management-system-buyz.onrender.com/

# Authentication Endpoints

Method | Endpoint             | Authentication | Description 

 POST   | `/api/auth/register` | No             | Register a new user 
 POST   | `/api/auth/login`    | No             | Authenticate a user and receive JWT 

## Register User

  http
POST /api/auth/register
Content-Type: application/json


Example request body:

```json
{
  "fullname": "Test Customer",
  "email": "customer@example.com",
  "password": "password123"
}
```

The password must satisfy the validation rules defined by the application.

A successful registration creates a new user with the default customer role.

## Login

```http
POST /api/auth/login
Content-Type: application/json
```

Example request body:

```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

A successful login returns a JWT token.

Example response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "YOUR_JWT_TOKEN"
}
```

The returned token should be used when accessing protected endpoints.


# User Endpoints

 Method | Endpoint            | Authentication | Role           | Description 

 GET    | `/api/user/profile` | Yes            | Customer/Admin | Get authenticated user's profile 


## Get User Profile

```http
GET /api/user/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

The endpoint returns information belonging to the currently authenticated user.

# Queue Endpoints — Customer

| Method   | Endpoint          | Authentication | Role        | Description |

| POST     | `/api/queue/join` | Yes             | Customer   | Join the waiting queue |
| GET      | `/api/queue/position`               | Yes        | Customer | Get current queue position |


## Join Queue

```http
POST /api/queue/join
Authorization: Bearer CUSTOMER_JWT_TOKEN
```

The authenticated customer is added to the queue.

The customer does not need to provide their user ID because the system obtains the authenticated user's ID from the JWT.

### Business Rule

A customer cannot have more than one active queue entry.

If the customer already has a queue entry with either:

```text
waiting
```

or:

```text
serving
```

the system rejects another attempt to join the queue.

---

## Get Queue Position

```http
GET /api/queue/position
Authorization: Bearer CUSTOMER_JWT_TOKEN
```

This endpoint is intended for customers.

It returns the authenticated customer's current position in the queue.

The customer does not provide a user ID because the system identifies the customer through the JWT.

---

# Queue Endpoints — Admin

| Method | Endpoint | Authentication | Role | Description |

| GET     | `/api/queue/`          | Yes | Admin | View waiting customers |
| GET     | `/api/queue/stats`     | Yes | Admin | View queue statistics |
| PUT     | `/api/queue/call-next` | Yes | Admin | Call the next waiting customer |
| PUT     | `/api/queue/serve`     | Yes | Admin | Mark serving customer as served |

---

## View Waiting Customers

```http
GET /api/queue/
Authorization: Bearer ADMIN_JWT_TOKEN
```

This endpoint returns the customers currently waiting in the queue.

Only administrators are allowed to access this endpoint.

---

## Queue Statistics

```http
GET /api/queue/stats
Authorization: Bearer ADMIN_JWT_TOKEN
```

This endpoint provides administrative queue information, including the number of customers currently in the queue.

Only administrators are allowed to access this endpoint.

---

## Call Next Customer

```http
PUT /api/queue/call-next
Authorization: Bearer ADMIN_JWT_TOKEN
```

The administrator calls the next eligible waiting customer.

The system updates the existing queue record:

```text
waiting → serving
```

The operation does not create a new queue entity.

---

## Mark Customer as Served

```http
PUT /api/queue/serve
Authorization: Bearer ADMIN_JWT_TOKEN
```

Marks the currently serving customer as served.

The queue lifecycle is:

```text
waiting → serving → served
```

---

# Typical Customer Workflow

```text
1. Register
      ↓
2. Login
      ↓
3. Receive JWT
      ↓
4. Join Queue
      ↓
5. Check Queue Position
      ↓
6. Wait for Service
      ↓
7. Customer is called
      ↓
8. Customer is served
```

---

# Typical Admin Workflow

```text
1. Login as Admin
       ↓
2. Receive Admin JWT
       ↓
3. View Waiting Queue
       ↓
4. View Queue Statistics
       ↓
5. Call Next Customer
       ↓
6. Customer Status becomes serving
       ↓
7. Serve Customer
       ↓
8. Customer Status becomes served
```

---

# Response Format

Successful API responses generally follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Validation Error

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": [
    {
      "field": "fullname",
      "message": "\"fullname\" length must be at least 4 characters long"
    }
  ]
}
```

---

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource successfully created |
| 400 | Bad request / validation or business-rule failure |
| 401 | Authentication required or invalid |
| 403 | Authenticated but not authorized |
| 404 | Resource or route not found |
| 500 | Unexpected server error |

---

# Environment Variables

Create a local `.env` file using `.env.example` as a reference.

Example:

```env
PORT=3005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Environment Variable Descriptions

| Variable | Description |
|---|---|
| `PORT` | Port used by the application |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | JWT expiration duration |

### Security

Never commit your real `.env` file or secret values to GitHub.

For Render, environment variables are configured directly in the Render service settings.

---

# Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/Elias768-collab/smart_queue_management_system.git
```

## 2. Enter the Project Directory

```bash
cd smart_queue_management_system
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create:

```text
.env
```

Use:

```text
.env.example
```

as the configuration reference.

## 5. Start the Development Server

```bash
npm run dev
```

The local API runs on:

```text
http://localhost:3005
```

---

# Production Deployment

The MVP is deployed as a Node.js web service on Render.

MongoDB Atlas is used as the production database.

## Render Configuration

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

The production application is started through:

```text
node server.js
```

### Production API

```text
https://smart-queue-management-system-buyz.onrender.com
```

The Render deployment uses environment variables configured through the Render dashboard.

---

# Queue Business Rules

## Queue Status Lifecycle

Each queue record follows this general lifecycle:

```text
waiting
   ↓
serving
   ↓
served
```

### Waiting

The customer has joined the queue and is waiting to be served.

### Serving

The administrator has called the customer and the customer is currently being served.

### Served

The customer has completed service.

---

## Duplicate Active Queue Entries

A customer cannot have multiple active queue entries.

Before creating a queue entry, the system checks whether the authenticated user already has a queue record with status:

```text
waiting
```

or:

```text
serving
```

If such a record exists, the request is rejected.

This prevents a customer from joining the queue multiple times while already active.

---

## Administrator Queue Control

Only administrators can perform queue-management operations.

Customers cannot:

- View the administrative waiting queue
- Call the next customer
- Mark customers as served
- Access administrative queue statistics

This protects the queue from unauthorized manipulation.

---

## Ticket Number Behavior

The current MVP generates ticket numbers by continuing from the highest ticket number stored in the queue.

For example:

```text
1
2
3
4
...
25
26
27
```

Ticket numbers currently **do not reset to 1 automatically each day**.

This is the current MVP behavior.

Daily ticket-number reset is planned as a Stage 2 enhancement.

---

# Security Considerations

The application implements several basic security measures:

- Passwords are hashed before storage.
- JWTs are used to protect authenticated routes.
- Admin routes use role-based authorization.
- Request data is validated.
- Sensitive configuration is stored in environment variables.
- Production secrets are not committed to GitHub.
- MongoDB Atlas is used for production database hosting.
- Administrative queue operations are restricted to authorized users.

---

# Testing

The API was tested locally using Postman and subsequently tested against the deployed Render API.

## Production Regression Test

The following workflow was tested against the live API:

```text
1. Register Customer
2. Login Customer
3. Get Customer Profile
4. Join Queue
5. Check Queue Position
6. Login Admin
7. View Waiting Queue
8. View Queue Statistics
9. Call Next Customer
10. Mark Customer as Served
11. Verify Customer/Admin Access Restrictions
```

The production deployment was also verified for:

- MongoDB Atlas connectivity
- JWT authentication
- Customer authentication
- Admin authentication
- Role-based access control
- Queue creation
- Queue position calculation
- Duplicate active queue prevention
- Queue status transitions
- Admin queue operations

---

# Known MVP Limitations

The current version focuses on the core queue-management workflow.

The following features are not currently implemented:

- Daily ticket-number reset
- Email notifications
- SMS notifications
- Push notifications
- Real-time WebSocket updates
- Estimated waiting time
- Queue history
- Advanced queue analytics
- Multiple service counters
- Priority queues
- Dedicated admin management dashboard
- Automated unit tests
- Automated integration tests
- Swagger/OpenAPI documentation

These are considered enhancement-stage features rather than blockers for the current MVP.

---

# Planned Enhancements

## Stage 2

### Queue Improvements

- Daily ticket-number reset
- Queue history
- Estimated waiting time
- Advanced queue analytics
- Multiple service counters
- Priority queues

### Notification Service

- Email notifications
- SMS notifications
- Push notifications
- "Your turn is approaching" notifications

### Real-Time Features

- WebSocket integration
- Live queue position updates
- Real-time admin dashboard

### Administration

- Dedicated admin management
- More granular roles and permissions
- Audit logs
- Administrative dashboard

### Developer Experience

- Swagger/OpenAPI documentation
- Unit testing
- Integration testing
- Automated CI/CD checks
- Docker support

---

# Repository

GitHub Repository:

https://github.com/Elias768-collab/smart_queue_management_system

---

# Author

GitHub:

https://github.com/Elias768-collab
