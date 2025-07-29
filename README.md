# Gas Sales Project Frontend

A React-based frontend application for finding nearby gas sellers. This application uses geolocation to find gas stations near the user's current location and displays them with distance calculations.

## Features

- 🌍 **Geolocation**: Automatically detects user's current location
- 📍 **Nearby Sellers**: Finds gas sellers within proximity
- 📏 **Distance Calculation**: Shows exact distance to each seller
- 🎨 **Modern UI**: Clean and responsive design
- ⚡ **Real-time Data**: Fetches data from backend API

## Tech Stack

- **Frontend**: React 18 with Vite
- **HTTP Client**: Axios
- **Styling**: Inline CSS with modern design
- **Geolocation**: Browser Geolocation API
- **Backend Integration**: RESTful API calls

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend server running on `http://localhost:5000`

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuwankavi/Gas-Project.git
   cd gas-sales-project-frontend/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Project Structure

```
client/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── App.css          # Application styles
│   └── index.css        # Global styles
├── public/
│   └── vite.svg         # Application icon
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## API Endpoints

The application expects the following backend API endpoint:

- `GET /api/sellers/nearby?lat={latitude}&lng={longitude}` - Get nearby gas sellers

## Usage

1. **Allow Location Access**: When you first open the app, allow location access in your browser
2. **View Nearby Sellers**: The app will automatically fetch and display nearby gas sellers
3. **Check Distances**: Each seller card shows the distance from your current location

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

- **App.jsx**: Main component handling geolocation, API calls, and UI rendering
- **State Management**: Uses React hooks for managing application state
- **Error Handling**: Comprehensive error handling for API and geolocation failures

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Note**: Make sure your backend server is running on `http://localhost:5000` before using this frontend application.
