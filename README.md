# Gas Sales Project

A full-stack application for finding nearby gas sellers using React, Node.js, and MongoDB with geolocation features.

## 🚀 Features

- **Geolocation-based search** for nearby gas sellers
- **Real-time distance calculation** between user and sellers
- **MongoDB geospatial queries** for efficient location-based searches
- **Responsive React frontend** with modern UI
- **RESTful API** with Express.js backend

## 📁 Project Structure

```
gas-sales-project/
├── server/                 # Backend (Node.js + Express)
│   ├── models/
│   │   └── seller.js      # Mongoose schema for sellers
│   ├── routes/
│   │   └── seller.js      # API routes for sellers
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── README.md            # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```
   MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

   Server will run on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

   Frontend will run on: `http://localhost:5173`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/sellers
```

### Endpoints

#### 1. Add a New Seller
```http
POST /api/sellers
Content-Type: application/json

{
  "name": "Gas World",
  "address": "Colombo",
  "location": {
    "type": "Point",
    "coordinates": [80.12345, 7.12345]
  }
}
```

#### 2. Find Nearby Sellers
```http
GET /api/sellers/nearby?lat=7.12345&lng=80.12345&maxDistance=5000
```

**Parameters:**
- `lat` (required): Latitude of user's location
- `lng` (required): Longitude of user's location
- `maxDistance` (optional): Maximum distance in meters (default: 5000)

#### 3. Alternative Nearby Search
```http
GET /api/sellers/near?lat=7.12345&lng=80.12345&maxDistance=5000
```

## 🗄️ Database Schema

### Seller Model
```javascript
{
  name: String,           // Seller name
  address: String,        // Physical address
  location: {
    type: {
      type: String,       // Always "Point"
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],     // [longitude, latitude]
      required: true
    }
  }
}
```

## 🧪 Testing with Postman

### 1. Add Sample Sellers

**Seller 1:**
```json
{
  "name": "Gas World Colombo",
  "address": "Colombo Central",
  "location": {
    "type": "Point",
    "coordinates": [80.419226, 8.329626]
  }
}
```

**Seller 2:**
```json
{
  "name": "Quick Gas Station",
  "address": "Colombo North",
  "location": {
    "type": "Point",
    "coordinates": [80.420000, 8.330000]
  }
}
```

**Seller 3:**
```json
{
  "name": "City Gas Center",
  "address": "Colombo East",
  "location": {
    "type": "Point",
    "coordinates": [80.418000, 8.328000]
  }
}
```

### 2. Test Nearby Search
```http
GET http://localhost:5000/api/sellers/nearby?lat=8.329626&lng=80.419226
```

## 🌐 Frontend Features

- **Automatic geolocation** detection
- **Real-time distance calculation** using Haversine formula
- **Responsive design** with modern UI
- **Error handling** for location access issues
- **Loading states** for better UX

## 🔧 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Geolocation API** - Browser location services

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot POST /api/sellers"**
   - Check if backend is running on port 5000
   - Verify route is properly configured

2. **"MongoDB connection error"**
   - Check MONGO_URI in .env file
   - Ensure MongoDB Atlas is accessible

3. **"No sellers found"**
   - Add sellers to database first using POST requests
   - Check coordinates are in correct format [lng, lat]

4. **"Geolocation not supported"**
   - Use HTTPS in production
   - Allow location access in browser

### Debug Steps

1. **Check backend logs** for errors
2. **Verify MongoDB connection** in server console
3. **Test API endpoints** with Postman
4. **Check browser console** for frontend errors

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Gas Sales Project Team

---

**Happy coding! 🚀**