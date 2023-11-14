import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

const Map = () => {
  return (
    <MapContainer
      center={[-12.70032, -38.32043]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-12.70032, -38.32043]}>
        <Popup>Senai Camaçari.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
