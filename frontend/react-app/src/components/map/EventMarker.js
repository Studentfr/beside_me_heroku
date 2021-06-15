import React from "react";
import { Marker, Popup } from "react-leaflet";
import JoinForm from "../forms/JoinForm/JoinForm";

const EventMarker = (props) => {
  return (
    <Marker
      position={[props.event.longitude, props.event.latitude]}
      key={props.event.id}
    >
      <Popup>
        <JoinForm onAction={props.onEventHandler} eventDetail={props.event} />
      </Popup>
    </Marker>
  );
};

export default EventMarker;
