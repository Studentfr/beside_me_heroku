import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./EventMarker";
import EventMarker from "./EventMarker";
import "./Map.css";
const Map = () => {
  const [mapConfig, setMapConfig] = React.useState({
    center: [54.8732, 69.1505],
    zoom: 13,
    scrollWheelZoom: true,
  });

  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    fetch("api/meeting-list")
      .then((response) => response.json())
      .then(
        (events) => {
          setEvents(events);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div>
      <MapContainer
        className="map"
        center={mapConfig.center}
        zoom={mapConfig.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
          console.log(event);
          return <EventMarker event={event} />;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
