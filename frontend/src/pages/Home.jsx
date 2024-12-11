import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY1;
  const mapId = import.meta.env.VITE_MAP_ID;
  const [open, setOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 53.54, lng: 10 });
  const [address, setAddress] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const navigate = useNavigate();
  const getCurrentAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: apiKey,
          },
        }
      );
      if (response.data.status === "OK") {
        const fetchedAddress = response.data.results[0]?.formatted_address;
        setAddress(fetchedAddress || "no address found");
      } else {
        throw new Error(response.data.status);
      }
    } catch (err) {
      console.error("error fetching address ", err.message);
      setAddress("error fetching address");
    }
  };

  const handleManualEntryClick = () => {
    navigate("/manual-address"); // Redirect to the manual address page
  };

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newLocation);
          getCurrentAddress(newLocation.lat, newLocation.lng);
          setOpen(true);
          setLocationError(false);
        },
        () => {
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMapCenter({ lat: newLat, lng: newLng });
    getCurrentAddress(newLat, newLng);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <APIProvider apiKey={apiKey}>
        <div
          style={{
            height: "70%",
            width: "70%",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Map zoom={17} center={mapCenter} mapId={mapId}>
            <AdvancedMarker
              position={mapCenter}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
              onClick={() => setOpen(true)}
            />
            {open && (
              <InfoWindow
                position={mapCenter}
                onCloseClick={() => setOpen(false)}
              >
                <div>
                  <p>
                    <b>coordinates</b>
                    {mapCenter.lat},{mapCenter.lng}
                  </p>
                  <p>
                    <b>Address</b>
                    {address || "fetching address ...."}
                  </p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
        <div className="flex justify-around w-1/2 mt-4">
          <button
            onClick={handleUseGPS}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Use GPS
          </button>
          <button
            // onClick={() => setManualEntry(!manualEntry)}
            onClick={handleManualEntryClick}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Enter manually
          </button>
        </div>
        {/* {manualEntry && (
          <ManualAddressForm
            apiKey={apiKey}
            setMapCenter={setMapCenter}
            setOpen={setOpen}
          />
        )} */}
        {locationError && (
          <div className="text-red-500 text-center mt-4">
            <p>Error retrieving location. Please check your device settings.</p>
          </div>
        )}
      </APIProvider>
    </div>
  );
}
