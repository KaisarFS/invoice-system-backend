
# Invoice System Backend

This project is a **Node.js** and **Sequelize**-based backend for an invoice management system. It handles the creation of invoices, product management, and linking invoices with products, providing an API for interacting with the system. Pagination for invoices and form validation are also implemented, along with Sequelize models for `Invoice`, `Product`, and the `InvoiceProduct` pivot table.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Running the Project](#running-the-project)
5. [API Endpoints](#api-endpoints)
6. [Database Structure](#database-structure)
7. [Seeders](#seeders)
8. [Testing](#testing)
9. [Future Enhancements](#future-enhancements)

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **Sequelize**: ORM for managing database operations.
- **PostgreSQL**: Database system.
- **Sequelize CLI**: For migrations, seeders, and database setup.

## Project Structure
```
backend/
├── config/
│   ├── config.json               # Database configuration for different environments
├── controllers/
│   └── invoiceController.js      # Handles invoice creation and retrieval logic
├── migrations/
│   ├── create-invoice.js         # Migration for creating the Invoices table
│   ├── create-product.js         # Migration for creating the Products table
│   ├── create-invoice-product.js # Migration for creating the InvoiceProduct pivot table
├── models/
│   ├── invoice.js                # Invoice model definition
│   ├── product.js                # Product model definition
│   ├── index.js                  # Sequelize initialization and model registration
├── seeders/
│   ├── demo-invoice.js           # Seeder for inserting sample invoices
│   ├── demo-invoice-product.js   # Seeder for linking invoices with products
│   ├── demo-product.js           # Seeder for inserting sample products
├── package.json
└── server.js                     # Application entry point
```

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KaisarFS/invoice-system-backend
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**:
   - Ensure you have PostgreSQL installed and running on your system.
   - Update the `config/config.json` file with your database credentials.

4. **Create the database**:
   ```bash
   npx sequelize-cli db:create
   ```

5. **Run the migrations** to create tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Seed the database** with initial data (products, invoices, invoice-product links):
   ```bash
   npx sequelize-cli db:seed:all
   ```

## Running the Project

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. The server will start running on `http://localhost:3000`.

---

## API Endpoints

### 1. **Create an Invoice**
- **URL**: `POST /api/invoices`
- **Description**: Creates a new invoice with associated products.
- **Body**:
  ```json
  {
    "date": "2024-10-20",
    "customerName": "John Doe",
    "salespersonName": "Jane Smith",
    "notes": "Paid in full",
    "products": [1, 2]
  }
  ```
- **Response**: 
  - Success: `201 Created`
  - Error: `400 Bad Request` for validation errors

### 2. **Get All Invoices with Pagination**
- **URL**: `GET /api/invoices?limit={limit}&offset={offset}`
- **Description**: Retrieves paginated invoices, with products included.
- **Query Parameters**:
  - `limit`: Number of invoices per page (default: 10).
  - `offset`: Starting point for the pagination (default: 0).
- **Response**:
  ```json
  {
    "totalInvoices": 100,
    "totalPages": 10,
    "currentPage": 1,
    "invoices": [
      {
        "id": 1,
        "date": "2024-10-20",
        "customerName": "John Doe",
        "salespersonName": "Jane Smith",
        "notes": "Paid in full",
        "Products": [
          { "id": 1, "name": "Product A", "price": 10.99 },
          { "id": 2, "name": "Product B", "price": 5.49 }
        ]
      }
    ]
  }
  ```

  ### 3. **Product Autocomplete Search (for frontend)**
- **URL**: `GET /api/products?query={query}`
- **Description**: Search for products using a partial query. Returns a list of products matching the query.
- **Query Parameters**:
  - `query`: A partial search term for product names.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Product A",
      "price": 10.99,
      "stock": 50,
      "picture": "https://example.com/product-a.jpg"
    },
    {
      "id": 2,
      "name": "Product B",
      "price": 5.49,
      "stock": 30,
      "picture": "https://example.com/product-b.jpg"
    }
  ]


---

## Database Structure

- **`Products` Table**:
  - `id`: Primary key, auto-incremented.
  - `name`: Name of the product.
  - `price`: Price of the product.
  - `stock`: Available stock of the product.
  - `picture`: URL for the product image.
  
- **`Invoices` Table**:
  - `id`: Primary key, auto-incremented.
  - `date`: Date of the invoice.
  - `customerName`: Name of the customer.
  - `salespersonName`: Name of the salesperson.
  - `notes`: Additional notes.
  
- **`InvoiceProduct` Table**:
  - `invoiceId`: Foreign key to the `Invoices` table.
  - `productId`: Foreign key to the `Products` table.

---

## Seeders

1. **Products Seeder**:
   - Seeds the `Products` table with sample products.
2. **Invoices Seeder**:
   - Seeds the `Invoices` table with sample invoices.
3. **InvoiceProduct Seeder**:
   - Links sample products with invoices in the `InvoiceProduct` pivot table.

---

## Testing

You can test the API using **Postman** or **curl**:

1. **Test Invoice Creation**:
   - Use a `POST` request to `/api/invoices` with the required payload.
   
2. **Test Pagination**:
   - Use a `GET` request to `/api/invoices` with query parameters `limit` and `offset` to fetch paginated invoices.

---

## Future Enhancements

1. **Autocomplete for Products**:
   - Implement autocomplete for the product input field in the front end.
   
2. **Invoice Cards with Pagination**:
   - Create a React frontend to display paginated invoice cards.

3. **Revenue Graph**:
   - Implement time-series graphs for revenue projection (daily, weekly, monthly).
