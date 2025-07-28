import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async (lat, lng) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sellers/nearby?lat=${lat}&lng=${lng}`);
      setSellers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        fetchSellers(lat, lng);
      }, err => {
        alert("Failed to get location");
        console.error(err);
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Nearby Gas Sellers</h1>
      {sellers.map((seller, i) => (
        <div key={i} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <h3>{seller.name}</h3>
          <p>{seller.address}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
