import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapComponent = ({ users }) => {

  const [loadError, setLoadError] = useState(false); 
  
  const { isLoaded, loadErr:googleMapsLoadError} = useJsApiLoader({
    googleMapsApiKey: "insertGoogleAPI KEY HERE", // Replace with your API key
  });

  if (googleMapsLoadError){
    setLoadError(true)
  }
  const containerStyle = {
    height: "325px",
  };

  // Default center for the map
  const defaultCenter = {
    lat: 0,
    lng: 0,
  };
  if (loadError) {
    return <p>Failed to load map. Please update google map api key</p>
  }

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={2}>
      {users.map((user) => {
        // Extract latitude and longitude
        const lat = parseFloat(user.address.geo.lat);
        const lng = parseFloat(user.address.geo.lng);

        return (
          <Marker
            key={user.id}
            position={{ lat, lng }}
            title={`${user.name} (${user.company.name || "N/A"})`}
          />
        );
      })}
    </GoogleMap>
  );
};

export default MapComponent;
