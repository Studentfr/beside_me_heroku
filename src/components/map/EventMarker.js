import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import JoinForm from "../forms/JoinForm/JoinForm";

const EventMarker = (props) => {
  return (
    <Marker
      position={[props.event.longitude, props.event.latitude]}
      key={props.event.id}
    >
      <Tooltip direction="top" offset={[-13, 0]} opacity={1} permanent>
        {props.event.title}
      </Tooltip>
      <Popup>
        <JoinForm onAction={props.onEventHandler} eventDetail={props.event} />
      </Popup>
    </Marker>
  );
};

export default EventMarker;
