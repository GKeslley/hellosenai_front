import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Map = ({ refMap }) => {
  return (
    <Box ref={refMap}>
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
    </Box>
  );
};

export default Map;

Map.propTypes = {
  refMap: PropTypes.object,
};
