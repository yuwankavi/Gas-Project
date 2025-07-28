import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSellers = async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching sellers for location:', { lat, lng });
      const res = await axios.get(`http://localhost:5000/api/sellers/nearby?lat=${lat}&lng=${lng}`);
      console.log('Backend response:', res.data);
      setSellers(res.data);
    } catch (err) {
      console.error('Error fetching sellers:', err);
      setError('Failed to fetch nearby sellers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        console.log('User location obtained:', { lat, lng });
        fetchSellers(lat, lng);
      }, err => {
        console.error('Geolocation error:', err);
        setError("Failed to get your location. Please allow location access.");
      });
    } else {
      setError("Geolocation not supported in this browser");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2); // Distance in km
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚗 Nearby Gas Sellers</h1>
      
      {location && (
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <p><strong>Your Location:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
        </div>
      )}

      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading nearby sellers...</p>
        </div>
      )}

      {!loading && sellers.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No gas sellers found nearby. Try adding some sellers to the database first!</p>
        </div>
      )}

      {sellers.map((seller, i) => (
        <div key={seller._id || i} style={{ 
          border: '1px solid #ddd', 
          margin: '1rem 0', 
          padding: '1.5rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>⛽ {seller.name}</h3>
          <p style={{ margin: '0.5rem 0', color: '#7f8c8d' }}>📍 {seller.address}</p>
          {location && seller.location && (
            <p style={{ margin: '0.5rem 0', color: '#27ae60', fontWeight: 'bold' }}>
              📏 Distance: {calculateDistance(
                location.lat, 
                location.lng, 
                seller.location.coordinates[1], 
                seller.location.coordinates[0]
              )} km away
            </p>
          )}
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

export default App; 