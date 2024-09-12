## Prerequisites
- **Node.js**: Install Node.js (used v20).
- **PostgreSQL**: Install PostgreSQL and keep a server running.
- **Postman**: Install postman for APIs testing.

## Steps to follow
1. Go to project root directory
2. Install Dependencies of Node.js packages: $ `npm install`
3. Create a .env File in the root of the project with the following content:
    DB_HOST=<Your_db_host_name>
    DB_PORT=<Your_db_port>
    DB_USER=<Your_db_user_name>
    DB_PASSWORD=<Your_db_password>
    DB_NAME=<Your_db_name>
    JWT_TOKEN=<Your_JWT_for_External_APIS>
4. Initialize the Database to ensure your database is set up and running. Use the sync.js script to create the required tables: $ `node sync.js`
5. To start the server, use the following command: $ `npm start`

## APIs testing

The following endpoints are available:

### Sales Orders
- A postman collection for all APIs are available. File name is revest_assignment_collection.postman_collection.json. Import this collection postman.
- **Create Sales Order**: `POST /api/sales-orders`
  - **Request Body**:
    ```json
    {
      "customerName": "string",
      "email": "string",
      "mobileNumber": "string",
      "status": "string",
      "products": [...]
    }
    ```

- **Get All Sales Orders**: `GET /api/sales-orders`
  - **Query Parameters**:
    - `name`
    - `email`
    - `mobileNumber`
    - `status`
    - `orderDate`

- **Update Sales Order**: `PUT /api/sales-orders/:id`
  - **Request Body**:
    ```json
    {
      "customerName": "string",
      "email": "string",
      "mobileNumber": "string",
      "status": "string",
      "orderDate": "ISO date string"
    }
    ```

- **Delete Sales Order**: `DELETE /api/sales-orders/:id`

### Products

- **Create Internal Product**: `POST /api/products/internal`
  - **Request Body**:
    ```json
    {
      "productName": "string",
      "price": "number",
      "quantity": "number"
    }
    ```

- **Create External Product**: `POST /api/products/external`
  - **Request Body**:
    ```json
    {
      "productName": "string",
      "price": "number",
      "quantity": "number"
    }
    ```

- **Get All Products**: `GET /api/products`

- **Get Product by ID**: `GET /api/products/:id`

- **Update Product**: `PUT /api/products/:id`
  - **Request Body**:
    ```json
    {
      "productName": "string",
      "price": "number",
      "quantity": "number"
    }
    ```

- **Delete Product**: `DELETE /api/products/:id`

