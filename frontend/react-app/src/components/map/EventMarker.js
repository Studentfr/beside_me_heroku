import React from "react";
import { Marker, Popup } from "react-leaflet";

const EventMarker = (props) => {
  return (
    <Marker
      position={[props.event.longitude, props.event.latitude]}
      key={props.event.id}
    >
      <Popup>
        <b>{props.event.title}</b>
      </Popup>
    </Marker>
  );
};

export default EventMarker;
