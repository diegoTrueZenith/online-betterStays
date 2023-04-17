import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map(props) {
  return (
        <MapContainer center={[props.lat, props.long]} zoom={16} scrollWheelZoom={false} style={{ height: '400px', borderRadius: '10px', boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle center={[props.lat, props.long]} radius={100} />
        </MapContainer>
  )
}

export default Map
