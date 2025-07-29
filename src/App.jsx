// Import necessary React hooks and axios for API calls
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // State management for the application
  const [location, setLocation] = useState(null); // Stores user's current location (lat, lng)
  const [sellers, setSellers] = useState([]); // Stores array of nearby gas sellers
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for handling errors

  // Function to fetch nearby gas sellers from the backend API
  const fetchSellers = async (lat, lng) => {
    setLoading(true); // Start loading
    setError(null); // Clear any previous errors
    try {
      console.log('Fetching sellers for location:', { lat, lng });
      // Make API call to backend to get sellers near the given coordinates
      const res = await axios.get(`http://localhost:5000/api/sellers/nearby?lat=${lat}&lng=${lng}`);
      console.log('Backend response:', res.data);
      setSellers(res.data); // Update sellers state with API response
    } catch (err) {
      console.error('Error fetching sellers:', err);
      setError('Failed to fetch nearby sellers. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Stop loading regardless of success/failure
    }
  };

  // Function to get user's current location using browser geolocation API
  const getLocation = () => {
    // Check if geolocation is supported in the browser
    if ("geolocation" in navigator) {
      // Request user's current position
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude; // Extract latitude
        const lng = pos.coords.longitude; // Extract longitude
        setLocation({ lat, lng }); // Update location state
        console.log('User location obtained:', { lat, lng });
        fetchSellers(lat, lng); // Fetch sellers for this location
      }, err => {
        // Handle geolocation errors (user denied permission, etc.)
        console.error('Geolocation error:', err);
        setError("Failed to get your location. Please allow location access.");
      });
    } else {
      // Browser doesn't support geolocation
      setError("Geolocation not supported in this browser");
    }
  };

  // useEffect hook runs when component mounts (empty dependency array)
  useEffect(() => {
    getLocation(); // Get user location when app starts
  }, []);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Convert latitude difference to radians
    const dLng = (lng2 - lng1) * Math.PI / 180; // Convert longitude difference to radians
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2); // Return distance in kilometers, rounded to 2 decimal places
  };

  // Main component render
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Main heading */}
      <h1>🚗 Nearby Gas Sellers</h1>
      
      {/* Display user's current location if available */}
      {location && (
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <p><strong>Your Location:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Show loading message while fetching data */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading nearby sellers...</p>
        </div>
      )}

      {/* Show message when no sellers are found */}
      {!loading && sellers.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No gas sellers found nearby. Try adding some sellers to the database first!</p>
        </div>
      )}

      {/* Render list of gas sellers */}
      {sellers.map((seller, i) => (
        <div key={seller._id || i} style={{ 
          border: '1px solid #ddd', 
          margin: '1rem 0', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Seller name */}
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>⛽ {seller.name}</h3>
          {/* Seller address */}
          <p style={{ margin: '0.5rem 0', color: '#7f8c8d' }}>📍 {seller.address}</p>
          {/* Calculate and display distance from user to seller */}
          {location && seller.location && (
            <p style={{ margin: '0.5rem 0', color: '#27ae60', fontWeight: 'bold' }}>
              📏 Distance: {calculateDistance(
                location.lat, 
                location.lng, 
                seller.location.coordinates[1], // Latitude from seller data
                seller.location.coordinates[0]  // Longitude from seller data
              )} km away
            </p>
          )}
          {/* Display seller coordinates */}
          {seller.location && (
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#95a5a6' }}>
              Coordinates: {seller.location.coordinates[1].toFixed(6)}, {seller.location.coordinates[0].toFixed(6)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Export the App component as default
export default App; 