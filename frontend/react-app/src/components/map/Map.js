import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import EventMarker from "./EventMarker";
import FormCreate from "../forms/CreateForm/CreateForm";

import "./EventMarker";
import "./Map.css";
import CreateForm from "../forms/CreateForm/CreateForm";
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

  // const Cevents = [
  //   {
  //     id: 2,
  //     headman: {
  //       id: 1,
  //       firstname: "Aslan",
  //     },
  //     title: "Gachi Party",
  //     participants: 5,
  //     created_at: "2021-05-27T16:22:05.903812Z",
  //     start_at: "2021-05-28T16:22:33Z",
  //     longitude: 54.8732,
  //     latitude: 69.1505,
  //     is_expired: false,
  //     tags: [1, 2],
  //     users: [],
  //   },
  //   {
  //     id: 3,
  //     headman: {
  //       id: 1,
  //       firstname: "Aslan",
  //     },
  //     title: "Footbal",
  //     participants: 10,
  //     created_at: "2021-05-26T04:46:52.008408Z",
  //     start_at: "2021-05-27T18:00:00Z",
  //     longitude: 54.8968,
  //     latitude: 69.13245,
  //     is_expired: false,
  //     tags: [2],
  //     users: [4],
  //   },
  // ];

  const [newEventLongLat, setNewEventLongLat] = useState();

  const onMapClickHandler = (map) => {
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      setNewEventLongLat({ lat: lat, lng: lng });
    });
  };

  const creteFormHandler = () => {
    setNewEventLongLat();
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
