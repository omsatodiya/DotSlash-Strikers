import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Static location: Surat, Gujarat
const myLocation = { lat: 21.1702, lon: 72.8311, name: "Surat, Gujarat" };

// Sample static hospital data
const hospitalData = [
  {
    id: 1,
    name: "Sunshine Hospital",
    latitude: 21.1820,
    longitude: 72.8310,
    contact: "sunshine@example.com",
    address: "Ring Road, Surat",
  },
  {
    id: 2,
    name: "City Care Medical Center",
    latitude: 21.1625,
    longitude: 72.8440,
    contact: "citycare@example.com",
    address: "Adajan, Surat",
  },
  {
    id: 3,
    name: "LifeLine Hospital",
    latitude: 21.1720,
    longitude: 72.8200,
    contact: "lifeline@example.com",
    address: "Vesu, Surat",
  },
];

const MapComponent = () => {
  // Custom icon for your location (red)
  const myLocationIcon = new L.DivIcon({
    className: "my-location-icon",
    html: `<div style="background-color: red; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;"></div>`,
    iconSize: [30, 30],
  });

  // Shared icon for hospitals (blue)
  const sharedIcon = new L.DivIcon({
    className: "shared-location-icon",
    html: `<div style="background-color: blue; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;"></div>`,
    iconSize: [30, 30],
  });

  return (
    <div className="h-screen w-screen">
      <div className="p-4 bg-white">
        <h1 className="text-2xl font-semibold">Nearby Hospitals in Surat</h1>
      </div>

      <MapContainer
        center={[myLocation.lat, myLocation.lon]}
        zoom={13}
        style={{ width: "100%", height: "calc(100% - 100px)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Your static location */}
        <Marker position={[myLocation.lat, myLocation.lon]} icon={myLocationIcon}>
          <Popup>{myLocation.name}</Popup>
        </Marker>

        {/* Static hospitals */}
        {hospitalData.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitude, hospital.longitude]}
            icon={sharedIcon}
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
        ))}
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
