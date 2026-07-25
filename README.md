# `README.md`

````markdown
# 🍕 FeastyFiesta – Production-Ready Zomato Clone

A production-ready food delivery platform inspired by **Zomato** and **Swiggy**, built using a **Microservices Architecture**, **RabbitMQ**, **MongoDB**, **Docker**, and **React**.

The project demonstrates how large-scale food delivery applications are built with scalable backend services, asynchronous communication, real-time order tracking, secure authentication, cloud image storage, and modern frontend technologies.

---

# 📖 Table of Contents

- Features
- Tech Stack
- System Architecture
- Microservices
- Database Architecture
- Entity Relationship Diagram
- API Flow
- RabbitMQ Event Flow
- Folder Structure
- Installation
- Environment Variables
- Running the Project
- Future Improvements

---

# 🚀 Features

## Customer

- Google Authentication
- JWT Authentication
- Browse Restaurants
- Search Restaurants
- Restaurant Details
- Browse Menu
- Add to Cart
- Remove from Cart
- Quantity Management
- Single Restaurant Cart Restriction
- Checkout
- Order Tracking
- Live Delivery Status
- Profile Management

---

## Restaurant Owner

- Login
- Register Restaurant
- Upload Restaurant Images
- Manage Restaurant Details
- Add Menu Items
- Delete Menu Items
- Toggle Item Availability
- View Orders
- Accept Orders

---

## Delivery Partner

- Login
- Receive Assigned Orders
- Update Delivery Status
- Live Location Updates
- Order Completion

---

## Admin

- Restaurant Verification
- User Management
- Seller Management
- Analytics Dashboard
- Reports

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- TailwindCSS
- Axios
- React Router
- React Hot Toast
- React Icons

---

## Backend

- Node.js
- Express
- TypeScript

---

## Database

- MongoDB
- Mongoose

---

## Authentication

- JWT
- Google OAuth

---

## Messaging

- RabbitMQ

---

## File Storage

- Cloudinary

---

## Deployment

- Docker
- Docker Compose
- Nginx

---

# 🏗 System Architecture

```
                           +------------------+
                           |     Client       |
                           | React + TS       |
                           +---------+--------+
                                     |
                                     |
                          API Gateway / Nginx
                                     |
    --------------------------------------------------------------------
    |          |            |            |             |               |
    ▼          ▼            ▼            ▼             ▼               ▼

 User     Restaurant      Cart        Order       Payment        Delivery
Service      Service      Service      Service      Service        Service

    |           |            |            |             |               |
    ▼           ▼            ▼            ▼             ▼               ▼

 MongoDB    MongoDB      MongoDB      MongoDB      MongoDB        MongoDB

                        RabbitMQ Event Bus

```

Each microservice owns its own database.

No service directly accesses another service's database.

Communication happens through REST APIs and RabbitMQ events.

---

# 🧩 Microservices

## User Service

Responsible for

- Authentication
- Google Login
- JWT
- User Profile

Database

```
users
```

---

## Restaurant Service

Responsible for

- Restaurant Registration
- Restaurant Details
- Menu Management
- Availability

Database

```
restaurants
menuitems
```

---

## Cart Service

Responsible for

- Add Items
- Remove Items
- Increase Quantity
- Decrease Quantity
- Clear Cart

Business Rule

```
One customer can order from only one restaurant at a time.
```

Database

```
carts
```

---

## Order Service

Responsible for

- Place Orders
- Order Status
- Order History

Database

```
orders
```

---

## Payment Service

Responsible for

- Payment
- Refunds
- Transactions

Database

```
payments
```

---

## Delivery Service

Responsible for

- Rider Assignment
- Live Tracking
- Delivery Updates

Database

```
deliveries
```

---

# 🗄 Database Architecture

## Users Collection

```javascript
{
    _id,
    name,
    email,
    image,
    role,
    createdAt,
    updatedAt
}
```

---

## Restaurants Collection

```javascript
{
    _id,

    ownerId,

    name,

    phone,

    cuisine,

    image,

    autoLocation:{
        lat,
        lng,
        formattedAddress
    },

    isOpen,

    isVerified,

    createdAt,

    updatedAt
}
```

---

## Menu Items Collection

```javascript
{
    _id,

    restaurantId,

    name,

    description,

    image,

    category,

    price,

    isAvailable,

    createdAt,

    updatedAt
}
```

---

## Cart Collection

```javascript
{
    _id,

    userId,

    restaurantId,

    itemId,

    quantity,

    createdAt,

    updatedAt
}
```

---

## Orders Collection

```javascript
{
    _id,

    userId,

    restaurantId,

    deliveryPartnerId,

    items:[
        {
            itemId,
            quantity,
            price
        }
    ],

    subtotal,

    deliveryFee,

    platformFee,

    total,

    paymentStatus,

    orderStatus,

    deliveryLocation,

    createdAt,

    updatedAt
}
```

---

## Payments Collection

```javascript
{
    _id,

    orderId,

    userId,

    amount,

    transactionId,

    provider,

    status,

    createdAt
}
```

---

## Delivery Collection

```javascript
{
    _id,

    orderId,

    riderId,

    riderLocation:{
        lat,
        lng
    },

    estimatedArrival,

    status,

    createdAt,

    updatedAt
}
```

---

# 📊 Entity Relationship Diagram

```
                      USERS
                   +---------+
                   |  _id    |
                   +---------+
                        |
      ----------------------------------------
      |                    |                |
      ▼                    ▼                ▼

 RESTAURANTS            CART            ORDERS
      |                  |                 |
      |                  |                 |
      ▼                  ▼                 ▼

 MENU ITEMS          ITEM ID          PAYMENTS
      |
      |
      ▼

   ORDERS
```

---

# 🔗 Database Ownership

| Collection | Owner Service |
|------------|---------------|
| users | User Service |
| restaurants | Restaurant Service |
| menuitems | Restaurant Service |
| carts | Cart Service |
| orders | Order Service |
| payments | Payment Service |
| deliveries | Delivery Service |

---

# 📬 RabbitMQ Event Flow

```
Customer Places Order

        │

        ▼

 Order Service

        │

        ▼

 RabbitMQ

        │

 ┌──────┼───────────┐

 ▼      ▼           ▼

Payment Restaurant Delivery

Service  Service    Service

                     │

                     ▼

              Notification Service
```

---

# 📢 RabbitMQ Events

| Event | Publisher | Consumers |
|--------|-----------|-----------|
| CartCreated | Cart Service | Order Service |
| OrderPlaced | Order Service | Payment Service |
| PaymentSuccessful | Payment Service | Delivery Service |
| DeliveryAssigned | Delivery Service | Notification Service |
| OrderDelivered | Delivery Service | Analytics Service |

---

# ⚡ Indexes

## Users

```
email (Unique)
```

---

## Restaurants

```
ownerId

isOpen

2dsphere(autoLocation)
```

---

## Menu Items

```
restaurantId

category
```

---

## Cart

```
userId

restaurantId

itemId

Compound Index

(userId, restaurantId, itemId)
```

---

## Orders

```
userId

restaurantId

deliveryPartnerId

status

createdAt
```

---

## Payments

```
orderId

transactionId

status
```

---

## Delivery

```
orderId

riderId

status

2dsphere(riderLocation)
```

---

# 🔄 Complete Request Flow

```
Customer

    │

    ▼

React Frontend

    │

    ▼

API Gateway

    │

    ▼

Restaurant Service

    │

    ▼

Cart Service

    │

    ▼

Order Service

    │

    ▼

RabbitMQ

    │

    ├────────► Payment Service

    │

    ├────────► Delivery Service

    │

    └────────► Notification Service
```

---

# 📁 Project Structure

```
FeastyFiesta/

│

├── frontend/

│     ├── components

│     ├── pages

│     ├── context

│     ├── hooks

│     ├── services

│     └── assets

│

├── services/

│     ├── user-service

│     ├── restaurant-service

│     ├── cart-service

│     ├── order-service

│     ├── payment-service

│     ├── delivery-service

│

├── rabbitmq

├── docker

├── nginx

└── README.md
```

---

# ⚙ Installation

Clone repository

```bash
git clone https://github.com/yourusername/FeastyFiesta.git

cd FeastyFiesta
```

Install dependencies

```bash
npm install
```

Frontend

```bash
cd frontend

npm install
```

Backend

```bash
cd backend

npm install
```

---

# 🔐 Environment Variables

## Backend

```env
PORT=5002

MONGO_URI=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

CLOUDINARY_NAME=

CLOUDINARY_KEY=

CLOUDINARY_SECRET=

RABBITMQ_URL=
```

Frontend

```env
VITE_API_URL=http://localhost:5002
```

---

# ▶ Running

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

Docker

```bash
docker compose up --build
```

---

# 📈 Scalability

The application is designed for production using:

- Database-per-service architecture
- RabbitMQ asynchronous communication
- Horizontal scaling
- Docker containers
- Nginx API Gateway
- Cloudinary CDN
- JWT authentication
- Geospatial indexing
- Event-driven architecture
- Independent deployment of services

---

# 🚧 Future Improvements

- Redis Caching
- Elasticsearch Restaurant Search
- Kafka Event Streaming
- Kubernetes Deployment
- Stripe Integration
- Razorpay Integration
- Push Notifications
- Socket.IO Live Delivery Tracking
- Prometheus Monitoring
- Grafana Dashboards
- CI/CD with GitHub Actions
- Load Balancer
- Rate Limiting
- API Versioning
- OpenAPI (Swagger) Documentation

---

# 👨‍💻 Author

**Anuva Agarwal**

Master's in Computer Engineering  
Illinois Institute of Technology

Built as a production-scale learning project demonstrating modern backend architecture, scalable microservices, asynchronous messaging with RabbitMQ, and a responsive React frontend.
````

This README is structured like a professional open-source project, similar to repositories from experienced backend engineers, and is suitable for showcasing on GitHub or in your portfolio.
