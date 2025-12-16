# E-Commerce Backend API

Backend API for the E-commerce web application built with Node.js, Express, and MongoDB.

## Features

- 🔐 **User Authentication** - JWT-based authentication with bcrypt password hashing
- 👤 **User Management** - Registration, login, profile management
- 🛍️ **Product Management** - CRUD operations for products (Admin only)
- 🛒 **Shopping Cart** - Add, update, remove items from cart
- 📦 **Order Management** - Create and track orders
- 👨‍💼 **Admin Dashboard** - Complete admin panel for managing products, orders, users
- 📷 **Image Upload** - Cloudinary integration for product images
- 🔒 **Role-based Access Control** - User and Admin roles

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer + Cloudinary
- **CORS**: Enabled for frontend integration

## Installation

### 1. Install Dependencies

```bash
cd backendd
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backendd` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**

```bash
# Install MongoDB locally and start the service
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Add it to your `.env` file

### 4. Create Uploads Folder

```bash
mkdir uploads
```

### 5. Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on `http://localhost:8000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description       | Auth |
| ------ | ------------------ | ----------------- | ---- |
| POST   | `/register`        | Register new user | No   |
| POST   | `/login`           | Login user        | No   |
| GET    | `/profile`         | Get user profile  | Yes  |
| PUT    | `/profile`         | Update profile    | Yes  |
| PUT    | `/change-password` | Change password   | Yes  |
| POST   | `/logout`          | Logout user       | Yes  |

### Product Routes (`/api/products`)

| Method | Endpoint      | Description        | Auth  |
| ------ | ------------- | ------------------ | ----- |
| GET    | `/`           | Get all products   | No    |
| GET    | `/:id`        | Get single product | No    |
| GET    | `/search`     | Search products    | No    |
| GET    | `/categories` | Get categories     | No    |
| POST   | `/`           | Create product     | Admin |
| PUT    | `/:id`        | Update product     | Admin |
| DELETE | `/:id`        | Delete product     | Admin |

### Cart Routes (`/api/cart`)

| Method | Endpoint        | Description      | Auth |
| ------ | --------------- | ---------------- | ---- |
| GET    | `/`             | Get user's cart  | Yes  |
| POST   | `/add`          | Add item to cart | Yes  |
| PUT    | `/item/:itemId` | Update cart item | Yes  |
| DELETE | `/item/:itemId` | Remove from cart | Yes  |
| DELETE | `/clear`        | Clear cart       | Yes  |
| GET    | `/count`        | Get cart count   | Yes  |

### Order Routes (`/api/orders`)

| Method | Endpoint            | Description          | Auth  |
| ------ | ------------------- | -------------------- | ----- |
| POST   | `/`                 | Create order         | Yes   |
| GET    | `/my-orders`        | Get user orders      | Yes   |
| GET    | `/:id`              | Get order details    | Yes   |
| PUT    | `/:id/cancel`       | Cancel order         | Yes   |
| GET    | `/admin/all`        | Get all orders       | Admin |
| PUT    | `/admin/:id/status` | Update order status  | Admin |
| GET    | `/admin/stats`      | Get order statistics | Admin |

## Example API Requests

### Register User

```bash
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Create Product (Admin)

```bash
POST http://localhost:8000/api/products
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

{
  "title": "Cool T-Shirt",
  "description": "A very cool t-shirt",
  "price": 29.99,
  "category": "clothing",
  "stock": 100,
  "sizes": ["S", "M", "L", "XL"],
  "images": [file1, file2]
}
```

### Add to Cart

```bash
POST http://localhost:8000/api/cart/add
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2,
  "size": "M"
}
```

### Create Order

```bash
POST http://localhost:8000/api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "COD"
}
```

## Database Models

### User

- name, email, password (hashed)
- role: 'user' | 'admin'
- timestamps

### Product

- title, description, price
- image, images[]
- category, stock, sizes[]
- timestamps

### Cart

- userId (ref: User)
- items: [{ productId, quantity, size, price }]
- totalPrice
- timestamps

### Order

- userId (ref: User)
- items: [{ productId, title, quantity, size, price }]
- totalAmount, status, shippingAddress, paymentMethod
- timestamps

## Creating an Admin User

To create an admin user, you need to manually update the database:

```javascript
// Using MongoDB shell or Compass
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

Or register a user normally and then update their role in the database.

## Project Structure

```
backendd/
├── config/
│   ├── db.js              # MongoDB connection
│   └── jwt.js             # JWT configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── productController.js # Product CRUD
│   ├── cartController.js   # Cart operations
│   └── orderController.js  # Order management
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   ├── adminMiddleware.js  # Admin authorization
│   └── uploadMiddleware.js # File upload handling
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   ├── Cart.js            # Cart schema
│   └── Order.js           # Order schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── productRoutes.js   # Product endpoints
│   ├── cartRoutes.js      # Cart endpoints
│   └── orderRoutes.js     # Order endpoints
├── utils/
│   └── cloudinary.js      # Cloudinary helpers
├── uploads/               # Temporary file uploads
├── .env                   # Environment variables
├── .env.example           # Example env file
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
└── server.js             # Entry point
```

## Testing

You can test the API using:

- **Postman** - Import the endpoints and test
- **Thunder Client** (VS Code extension)
- **cURL** commands
- Your frontend React app

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Start MongoDB
4. ✅ Run the server
5. 🔜 Create admin user
6. 🔜 Test API endpoints
7. 🔜 Connect frontend to backend
8. 🔜 Build admin dashboard

## Support

For issues or questions, please check the documentation or create an issue in the repository.
