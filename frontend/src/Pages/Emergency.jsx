import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import L from "leaflet"; // Import Leaflet for custom icons
import "leaflet/dist/leaflet.css";

// Sample locations array (latitude, longitude, and name for each marker)
const locations = [
  { lat: 21.1702, lon: 72.8311, name: "Location 1", id: "1" }, // Example location 1
  { lat: 23.7041, lon: 71.1025, name: "Location 2", id: "2" }, // Example location 2
  { lat: 20.7128, lon: 74.0060, name: "Location 3", id: "3" }, // Example location 3
];

// Your location
const myLocation = { lat: 21.1702, lon: 72.8311, name: "My Location" };

const MapComponent = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Custom icon for your location (using a different color)
  const myLocationIcon = new L.DivIcon({
    className: "my-location-icon",
    html: <div style="background-color:red; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white;"></div>, // Custom red circle
    iconSize: [25, 25], // Size of the icon
  });

  // Default icon for other locations (using Leaflet's default icon)
  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Default Leaflet marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png", // Shadow for the marker
    shadowSize: [41, 41],
  });

  // Function to handle the redirection when clicking on a location marker
  const handleMarkerClick = (locationId) => {
    // Navigate to a different route based on locationId (e.g., /location/:id)
    navigate(`/location/${locationId}`);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>Map Showing Multiple Locations</h1>

      <MapContainer
        center={[myLocation.lat, myLocation.lon]} // Default center to your location
        zoom={5} // Adjust zoom level as needed
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for your location with a custom icon */}
        <Marker
          key="my-location"
          position={[myLocation.lat, myLocation.lon]}
          icon={myLocationIcon}
          title={myLocation.name} // Title will appear on hover
        >
          <Popup>{myLocation.name}</Popup>
        </Marker>

        {/* Loop through other locations and add markers for each */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lon]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location.id), // Call the handler when the marker is clicked
            }}
          >
            {/* Tooltip with custom card-style appearance */}
            <Tooltip
              direction="top"
              offset={[0, -30]} // Adjust the offset so it appears above the marker
              permanent
              className="custom-tooltip"
            >
              <div style={tooltipStyle}>
                <h3>{location.name}</h3>
              </div>
            </Tooltip>

            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Custom tooltip card style
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