import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import EventMarker from "./EventMarker";
import CreateForm from "../forms/CreateForm/CreateForm";

import "./EventMarker";
import "./Map.css";

const Map = () => {
  const [mapConfig, setMapConfig] = React.useState({
    center: [54.8732, 69.1505],
    zoom: 13,
    scrollWheelZoom: true,
  });

  const [events, setEvents] = React.useState([]);
  const [newEventLongLat, setNewEventLongLat] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch("api/meeting-list")
      .then((response) => response.json())
      .then(
        (events) => {
          setEvents(events);
          setFlag(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [flag]);

  const onMapClickHandler = (map) => {
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      setNewEventLongLat({ lat: lng, lng: lat });
    });
  };

  const creteFormHandler = () => {
    setNewEventLongLat();
    setFlag(true);
  };

  const filteredEvents = events.filter((event) => {
    const start_date = new Date(event.start_at);
    start_date.setMinutes(start_date.getMinutes() - 15);
    if (new Date() <= start_date && event.users.length < event.participants) {
      event.participants = `${event.users.length}/${event.participants}`;
      return true;
    }
    return false;
  });

  return (
    <>
      {newEventLongLat && (
        <CreateForm
          onEventHandler={creteFormHandler}
          coordinates={newEventLongLat}
        />
      )}
      <MapContainer
        className="map"
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        whenCreated={onMapClickHandler}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredEvents.map((event) => {
          return <EventMarker key={event.id} event={event} />;
        })}
      </MapContainer>
    </>
  );
};

export default Map;
