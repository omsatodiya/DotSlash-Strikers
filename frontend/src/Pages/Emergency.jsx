import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Your location (you might want to get this from browser's geolocation)
const myLocation = { lat: 21.1702, lon: 72.8311, name: "My Location" };

const MapComponent = () => {
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospital');
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        console.log("Raw Hospital Data:", data); // Log raw data
        
        // Extract all hospitals and their coordinates (no limit to 5)
        const hospitals = data.data.map((hospital) => {
          const [longitude, latitude] = hospital.location.coordinates; // Extract coordinates
          return {
            id: hospital._id,
            name: hospital.name,
            latitude: latitude,
            longitude: longitude,
            contact: hospital.email,
            address: hospital.address, // Assuming address exists
          };
        });

        // Log each hospital's coordinates
        hospitals.forEach((hospital) => {
          console.log(`Hospital: ${hospital.name} | Coordinates: Lat: ${hospital.latitude}, Lon: ${hospital.longitude}`);
        });

        setHospitalData(hospitals);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Custom icon for your location (unique color - red)
  const myLocationIcon = new L.DivIcon({
    className: "my-location-icon",
    html: `<div style="background-color: red; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;"></div>`,
    iconSize: [30, 30],
  });

  // Shared default icon for hospitals (same color)
  const sharedIcon = new L.DivIcon({
    className: "shared-location-icon",
    html: `<div style="background-color: blue; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;"></div>`,
    iconSize: [30, 30],
  });

  const handleMarkerClick = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };

  if (loading) {
    return <div>Loading hospitals...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-screen">
      <div className="p-4 bg-white">
        <h1>Nearby Hospitals</h1>
      </div>

      <MapContainer
        center={[myLocation.lat, myLocation.lon]}
        zoom={12}
        style={{ width: "100%", height: "calc(100% - 100px)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Your location marker */}
        <Marker
          position={[myLocation.lat, myLocation.lon]}
          icon={myLocationIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>

        {/* Hospital markers */}
        {hospitalData.length > 0 ? (
          hospitalData.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.latitude, hospital.longitude]}
              icon={sharedIcon} // Same color for hospital markers
              eventHandlers={{
                click: () => handleMarkerClick(hospital.id),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -30]}
                permanent
                className="custom-tooltip"
              >
                <div style={tooltipStyle}>
                  <h3>{hospital.name}</h3>
                </div>
              </Tooltip>

              <Popup>
                <div>
                  <h3>{hospital.name}</h3>
                  <p>Contact: {hospital.contact}</p>
                  <p>Address: {hospital.address}</p>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <div>No hospitals available to display</div>
        )}
      </MapContainer>
    </div>
  );
};

const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  maxWidth: "150px",
  textAlign: "center",
};

export default MapComponent;
