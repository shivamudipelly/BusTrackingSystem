import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useParams } from "react-router-dom";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { apiUrl } from "../const";

export default function App() {
  const [busLocation, setBusLocation] = useState({ latitude: null, longitude: null });
  const { busId } = useParams();
  const mapRef = useRef(null); // Reference for the map container

  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${apiUrl}/auth/user/map/${busId}`);
        console.log(response.data);
        if (response.data.location) {
          const { latitude, longitude } = response.data.location;
          setBusLocation({ latitude, longitude });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Fetch location every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [busId]);

  useEffect(() => {
    // Update the map center and zoom when busLocation changes
    if (mapRef.current && busLocation.latitude !== null && busLocation.longitude !== null) {
      mapRef.current.setView([busLocation.latitude, busLocation.longitude], 15); // Set zoom level to 15 (adjust as needed)
    }
  }, [busLocation]);

  const customIcon = new L.Icon({
    iconUrl: require("../images/placeholder.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19} // Example of setting maxZoom
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {busLocation.latitude !== null && busLocation.longitude !== null && (
        <Marker position={[busLocation.latitude, busLocation.longitude]} icon={customIcon} />
      )}
    </MapContainer>
  );
}
