// MapLayout.js
import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Outlet } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useCenter } from "../components/CenterProvider";

export default function MapLayout({ zoom }) {
  const { center } = useCenter(); 
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <MapContainer ref={mapRef} center={center} zoom={zoom} style={{ height: "100vh", width: "100%", transition: 'linear 0.3' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Outlet />
    </MapContainer>
  );
}
