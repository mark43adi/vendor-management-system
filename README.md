# Vendor Management System

This is a Node.js-based Vendor Management System developed to manage vendor profiles, track purchase orders, and calculate vendor performance metrics. The system is built using Express.js and includes a RESTful API for interacting with the data models.

## Features

1. **Vendor Profile Management**
   - Create, update, retrieve, and delete vendor profiles.
   - API Endpoints:
     - `POST /api/vendors`: Create a new vendor.
     - `GET /api/vendors`: List all vendors.
     - `GET /api/vendors/:vendorId`: Retrieve a specific vendor's details.
     - `PUT /api/vendors/:vendorId`: Update a vendor's details.
     - `DELETE /api/vendors/:vendorId`: Delete a vendor.

2. **Purchase Order Tracking**
   - Create, update, retrieve, and delete purchase orders.
   - API Endpoints:
     - `POST /api/purchase-orders`: Create a new purchase order.
     - `GET /api/purchase-orders`: List all purchase orders.
     - `GET /api/purchase-orders/:poId`: Retrieve details of a specific purchase order.
     - `PUT /api/purchase-orders/:poId`: Update a purchase order.
     - `DELETE /api/purchase-orders/:poId`: Delete a purchase order.

3. **Vendor Performance Evaluation**
   - Calculate and retrieve vendor performance metrics:
     - On-Time Delivery Rate
     - Quality Rating
     - Response Time
     - Fulfillment Rate
   - API Endpoints:
     - `GET /api/vendors/performance`: Retrieve a vendor's performance metrics.

## Technical Stack

- **Node.js**
- **Express.js**
- **Mongoose (MongoDB)**
- **JWT Authentication**
- **Docker**

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest stable version of [Node.js](https://nodejs.org/).
- You have installed [Docker](https://www.docker.com/).
- You have a running instance of MongoDB. If using Docker, MongoDB can be set up using the provided `docker-compose.yaml`.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mark43adi/vendor-management-system.git
   cd vendor-management-system
