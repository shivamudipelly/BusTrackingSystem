import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { apiUrl } from "../const";
import { useCenter } from "./CenterProvider"; 

export default function BusLocation() {
  const { setCenter } = useCenter(); // Access setCenter function from context
  const [busLocation, setBusLocation] = useState({ latitude: null, longitude: null });
  const { busId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${apiUrl}/auth/user/map/${busId}`);
        console.log(response.data);
        if (response.data.location) {
          const { latitude, longitude } = response.data.location;
          setBusLocation({ latitude, longitude });
          setCenter([latitude, longitude]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [busId, setCenter]);

  const customIcon = new L.Icon({
    iconUrl: require("../images/placeholder.png"),
    iconSize: [38, 38],
  });

  return (
    busLocation.latitude !== null && busLocation.longitude !== null && (
      <Marker position={[busLocation.latitude, busLocation.longitude]} icon={customIcon} />
    )
  );
}
