import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const MapComponent = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY1,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY1}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map zoom={9} center={position} mapId={import.meta.env.VITE_MAP_ID}>
            <AdvancedMarker
              position={selectedLocation}
              onClick={() => setOpen(true)}
            >
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
            </AdvancedMarker>

            {open && (
              <InfoWindow
                position={selectedLocation}
                onCloseClick={() => setOpen(false)}
              >
                <p>I'm in Hamburg</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
